import React, { Component } from "react";

import ADD from "../../assets/icons/add.svg";
import {
  addExpert,
  addImage,
  fetchOneExpert,
  editExpert,
  fetchService,
} from "../store/action";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import BackArrow from "../../assets/icons/left-arrow.svg";
import Loader from "../../loader";
import CANCEL from "../../assets/icons/cancel.svg";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";

import Select from "react-select";
import CameraIcon from "../../assets/icons/photo-camera.svg";
import { Input } from "reactstrap";
import CIcon from "@coreui/icons-react";
import Avatar from "../../assets/icons/avatar.png";
import {
  optionsFields,
  optionsGender,
  optionsCountry,
  optionsExpertise,
  optionsRole,
  optionsIndustry,
  optionsSkill,
  optionsUnit,
} from "./ExpertsFieldsData";

class AddExpert extends Component {
  constructor(props) {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      gender: "",
      country: "",
      designation: "",
      expertise: [],
      loadiing: false,
      role: "",
      industry: "",
      fields: [],
      about: [],
      pricing: [],
      errorType: "",
      errorText: "",
      selectedCalendar: null,
      expertImage: null,
      selectedDate: new Date(),
      linkedIn: "",
      calendarId: null,
      calendarOptions: [],
      serviceList: [],
      unit: "",
    };
  }

  getCalenderList = (callback) => {
    this.props.fetchService(
      "expert/services",

      (value) => {
        if (value.status === 200) {
          const calendarOptions = (value.data.services || []).map(
            (service) => ({
              value: service.calendar_id,
              label: service.name,
            })
          );

          const serviceList = value.data.services || [];
          this.setState(
            {
              calendarOptions,
              serviceList,
              loading: false,
              // selectedCalendar: {
              //   value: this.state.calendarId,
              //   label: this.state.calendarId,
              // },
            },
            () => {
              if (callback) {
                callback();
              }
            }
          );
        }
      }
    );
  };
  componentDidMount() {
    const expert_id = this.props && this.props.match.params.id;

    if (expert_id) {
      this.callApiToFetchExpertDetails();
    } else {
      this.getCalenderList();
    }
  }

  callApiToFetchExpertDetails = () => {
    const expert_id = this.props && this.props.match.params.id;
    this.setState({
      loadiing: true,
    });
    this.props.fetchOneExpert(`expert?id=${expert_id}`, (value) => {
      const {
        first_name,
        last_name,
        gender,
        country,
        designation,
        expert_fields,
        current_role,
        industry,
        skills,
        email,
        contact_no,
        linkedIn,
        calendar_id,
        price,
        rates,
        info,
      } = value.data.expert;

      const infoData = info.map((el) => {
        return { value: el };
      });

      this.setState(
        {
          loadiing: false,
          first_name,
          last_name,
          gender,
          country,
          designation,
          fields: expert_fields,
          role: current_role,
          industry,
          email,
          contact: contact_no,
          linkedIn,
          about: infoData,
          skill: (skills && skills[0] && skills[0].label) || "",
          expertise: skills && skills[0] && skills[0].values,
          calendarId: calendar_id,
        },
        () => {
          this.getCalenderList(() => {
            const { serviceList, calendarId, calendarOptions } = this.state;

            const selectedCalendar = (calendarOptions || []).find(
              (service) => service.value === calendarId
            );

            this.setState({
              selectedCalendar: selectedCalendar,
              pricing: rates || [],
            });
          });
        }
      );
    });
  };
  uploadImage = (event) => {
    this.clearError();
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function () {
        this.callApiAddImage((reader && reader.result) || "");

        this.setState({
          expertImage: reader.result,
        });
      }.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  errorShow = (type) => {
    const { errorType, errorText } = this.state;
    return errorType === type ? <p>{errorText}</p> : null;
  };
  clearError = () => {
    this.setState({
      errorType: "",
      errorText: "",
    });
  };
  inputHandler = (e) => {
    this.clearError();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleUnit = (data, type, index) => {
    let pricingToUpdate = this.state.pricing[index];
    const newArray = [...this.state.pricing];
    pricingToUpdate = {
      ...pricingToUpdate,
      unit: data.value,
    };
    newArray[index] = pricingToUpdate;
    this.clearError();
    this.setState({ pricing: newArray });
  };

  handleChange = (data, type) => {
    const { unit } = this.state;
    this.clearError();

    if (type === "fields") {
      let arr;
      if (data.length <= 3) {
        arr = data.map((el) => {
          return el.value;
        });
        this.setState({
          fields: arr,
        });
      } else {
        NotificationManager.info("You can select upto 3 only", "", 1000);
      }
    }
    if (type === "gender") {
      this.setState({
        gender: data.value,
      });
    }

    if (type === "country") {
      this.setState({
        country: data.value,
      });
    }
    if (type === "calendarId") {
      const { serviceList } = this.state;

      const selectedService = serviceList.find(
        (item) => item.calendar_id === data.value
      );

      const pricingVal = (selectedService.services || []).map((data) => ({
        id: data.id,
        serviceName: data.name,
        value: "",
        unit: "",
      }));

      this.setState({
        selectedCalendar: data,
        pricing: pricingVal,
      });
    }
    if (type === "designation") {
      this.setState({
        designation: data.value,
      });
    }
    if (type === "expertise") {
      let arr;
      if (data.length <= 3) {
        arr = data.map((el) => {
          return el.value;
        });
        this.setState({
          expertise: arr,
        });
      } else {
        NotificationManager.info("You can select upto 3 only", "", 1000);
      }
    }
    if (type === "role") {
      this.setState({
        role: data.value,
      });
    }
    if (type === "industry") {
      this.setState({
        industry: data.value,
      });
    }

    if (type === "skill") {
      this.setState({
        skill: data.value,
      });
    }
  };
  validateEmail = (email) => {
    var re = /^(([^<>()\]\\.,;:\s@“]+(\.[^<>()\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  };
  onSubmit = (e) => {
    const expert_id = this.props && this.props.match.params.id;

    const {
      first_name,
      last_name,
      email,
      contact,
      gender,
      country,
      designation,
      selectedCalendar,
      role,
      industry,
      expertise,
      fields,
      about,
      pricing,

      linkedIn,
      skill,
    } = this.state;

    if (first_name === "") {
      this.setState({
        errorType: "first_name",
        errorText: (
          <span className="text-danger">
            <b>Name should not be empty</b>
          </span>
        ),
      });
      return;
    }
    if (first_name !== "") {
      let filter = /^[a-zA-Z0-9]+([-_\s]{1}[a-zA-Z0-9]+)*$/;

      if (!filter.test(first_name)) {
        this.setState({
          errorType: "first_name",
          errorText: (
            <span className="text-danger">
              <b>
                {" "}
                Name should be combination of alphanumeric text, underscore,
                space and hyphen
              </b>
            </span>
          ),
        });
        return;
      }
    }

    if (last_name === "") {
      this.setState({
        errorType: "last_name",
        errorText: (
          <span className="text-danger">
            <b>Name should not be empty</b>
          </span>
        ),
      });
      return;
    }
    if (last_name !== "") {
      let filter = /^[a-zA-Z0-9]+([-_\s]{1}[a-zA-Z0-9]+)*$/;

      if (!filter.test(last_name)) {
        this.setState({
          errorType: "last_name",
          errorText: (
            <span className="text-danger">
              <b>
                {" "}
                Name should be combination of alphanumeric text, underscore,
                space and hyphen
              </b>
            </span>
          ),
        });
        return;
      }
    }

    if (email === "") {
      this.setState({
        errorType: "email",
        errorText: (
          <span className="text-danger">
            <b>Email Id is empty</b>
          </span>
        ),
      });
      return;
    }
    if (!this.validateEmail(email)) {
      this.setState({
        errorType: "email",
        errorText: (
          <span className="text-danger">
            <b>Invalid email</b>
          </span>
        ),
      });
      return;
    }

    // if (contact === "") {
    //   this.setState({
    //     errorType: "contact",
    //     errorText: <span className="text-danger">Mobile number is empty</span>,
    //     loading: false,
    //   });

    //   return;
    // }

    if (contact !== "") {
      if (contact.length < 10 || contact.length > 10) {
        this.setState({
          errorType: "contact",
          errorText: (
            <span className="text-danger">
              {" "}
              <b>Phone number should be of length 10</b>
            </span>
          ),
          loading: false,
        });

        return;
      }
    }

    if (contact !== "") {
      let filter = /^\d{10}$/;
      if (!filter.test(contact)) {
        this.setState({
          errorType: "contact",
          errorText: (
            <span className="text-danger">
              {" "}
              <b>Please enter valid phone number</b>
            </span>
          ),
          loading: false,
        });

        return;
      }
    }

    if (gender === "") {
      this.setState({
        errorType: "gender",
        errorText: (
          <span className="text-danger">
            <b>Select your gender</b>
          </span>
        ),
      });
      return;
    }
    if (country === "") {
      this.setState({
        errorType: "country",
        errorText: (
          <span className="text-danger">
            <b>Select your country</b>
          </span>
        ),
      });
      return;
    }

    if (designation === "") {
      this.setState({
        errorType: "designation",
        errorText: (
          <span className="text-danger">
            <b>Designation should not be empty</b>
          </span>
        ),
      });
      return;
    }

    if (fields.length === 0) {
      this.setState({
        errorType: "fields",
        errorText: (
          <span className="text-danger">
            <b>Select your fields</b>
          </span>
        ),
      });
      return;
    }

    if (role === "") {
      this.setState({
        errorType: "role",
        errorText: (
          <span className="text-danger">
            <b>Select your current role</b>
          </span>
        ),
      });
      return;
    }
    if (industry === "") {
      this.setState({
        errorType: "industry",
        errorText: (
          <span className="text-danger">
            <b>Select your industry</b>
          </span>
        ),
      });
      return;
    }

    if (linkedIn === "") {
      this.setState({
        errorType: "linkedIn",
        errorText: (
          <span className="text-danger">
            <b>Please enter linkedIn link</b>
          </span>
        ),
      });
      return;
    }
    if (linkedIn !== "") {
      let filter = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

      if (!filter.test(linkedIn)) {
        this.setState({
          errorType: "linkedIn",
          errorText: (
            <span className="text-danger">
              <b> Please enter valid linkedIn link</b>
            </span>
          ),
        });
        return;
      }
    }
    if (selectedCalendar === null || !selectedCalendar.value) {
      this.setState({
        errorType: "selectedCalendar",
        errorText: (
          <span className="text-danger">
            <b>Please select calendar name</b>
          </span>
        ),
      });
      return;
    }

    if (pricing && pricing.length !== 0 && pricing.find((i) => i.value == "")) {
      this.setState({
        errorType: "pricing",
        errorText: (
          <span className="text-danger">
            <b>Please add price</b>
          </span>
        ),
      });
      return;
    }
    if (pricing && pricing.length !== 0 && pricing.find((i) => i.unit == "")) {
      this.setState({
        errorType: "pricing",
        errorText: (
          <span className="text-danger">
            <b>Please select unit</b>
          </span>
        ),
      });
      return;
    }

    if (skill === undefined) {
      this.setState({
        errorType: "skill",
        errorText: (
          <span className="text-danger">
            <b>Select your skill</b>
          </span>
        ),
      });
      return;
    }

    if (expertise.length === 0) {
      this.setState({
        errorType: "expertise",
        errorText: (
          <span className="text-danger">
            <b>Please enter your expert areas</b>
          </span>
        ),
      });
      return;
    }
    if (about.length === 0) {
      this.setState({
        errorType: "about",
        errorText: (
          <span className="text-danger">
            <b>Please add some information</b>
          </span>
        ),
      });
      return;
    }
    if (about.length === 1 && about[0].value === "") {
      this.setState({
        errorType: "about",
        errorText: (
          <span className="text-danger">
            <b>Please add some information</b>
          </span>
        ),
      });
      return;
    }

    if (!expert_id) {
      this.callApiAddExpert();
    } else {
      this.callApiEditExpert();
    }
  };

  callApiEditExpert = () => {
    const expert_id = this.props && this.props.match.params.id;
    const {
      first_name,
      last_name,
      gender,
      country,
      designation,
      fields,
      role,
      industry,
      selectedCalendar,

      linkedIn,
      about,
      pricing,
      skill,
      expertise,
      expertImage,
      email,
      contact,
    } = this.state;
    let aboutData = about.map((el) => {
      return el.value;
    });
    let skillObj = [{ label: skill, values: expertise }];
    const timeZone = moment.tz.guess(true);

    let obj = {
      id: expert_id,
      first_name,
      last_name,
      gender,
      country,
      designation,
      fields,
      role,
      industry,
      skills: skillObj,
      services: pricing,
      email,
      contact_no: contact ? contact : "",
      linkedIn,
      calendar_id: selectedCalendar.value,

      info: aboutData,
      time_zone: timeZone,
    };
    if (expertImage) {
      obj.profile_pic = expertImage;
    }

    this.setState({
      loadiing: true,
    });
    this.props.editExpert("expert/update-profile", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Expert edit successfully", "", 1000);
        this.props.history.push("/experts");
        this.setState({
          loadiing: false,
        });
      }
    });
  };

  callApiAddExpert = () => {
    const {
      first_name,
      last_name,
      email,
      contact,
      gender,
      country,
      designation,
      fields,
      role,
      industry,
      skill,
      expertise,

      linkedIn,
      about,
      pricing,
      expertImage,
      selectedCalendar,
    } = this.state;
    let aboutData = about.map((el) => {
      return el.value;
    });
    const timeZone = moment.tz.guess(true);
    let skillObj = [{ label: skill, values: expertise }];

    let obj = {
      first_name,
      last_name,
      gender,
      country,
      role,
      industry,
      skills: skillObj,
      fields,
      info: aboutData,
      linkedIn,
      designation,

      services: pricing,
      time_zone: timeZone,
      email,
      contact_no: contact ? contact : "",
      calendar_id: selectedCalendar.value,
    };
    if (expertImage) {
      obj.profile_pic = expertImage;
    }

    this.setState({
      loadiing: true,
    });
    this.props.addExpert("expert/create", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Expert added successfully", "", 1000);
        this.props.history.push("/experts");
        this.setState({
          loadiing: false,
        });
      }
    });
  };

  callApiAddImage = (base64) => {
    this.setState({
      loadiing: true,
    });

    let obj = {
      base64,
    };
    this.props.addImage("common/upload-image", obj, (value) => {
      if (value.status === 200) {
        this.setState({
          expertImage: value.data.url,
          loadiing: false,
        });
      }
    });
  };
  resetState = (e) => {
    e.preventDefault();
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      gender: "",
      country: "",
      designation: "",
      expertise: [],
      skill: "",
      role: "",
      industry: "",
      fields: [],
      about: [],
      pricing: [],
      errorType: "",
      errorText: "",

      linkedIn: "",
      selectedCalendar: null,
      calendarId: "",
      selectedDate: new Date(),
    });
  };
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push("/experts");
  };
  onChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };
  handlePlusButton = (e, type) => {
    const { about, pricing } = this.state;

    e.preventDefault();
    e.stopPropagation();
    if (type === "about") {
      const newArr = [...about];
      let newAbout = {
        value: "",
      };
      newArr.push(newAbout);
      this.setState({
        about: newArr,
      });
    }
    if (type === "pricing") {
      const newArr = [...pricing];
      let newPricing = {
        value: "",
      };
      newArr.push(newPricing);
      this.setState({
        pricing: newArr,
      });
    }
  };
  inputAbout = (e, index) => {
    let aboutToUpdate = this.state.about[index];
    const newArray = [...this.state.about];
    aboutToUpdate = {
      ...aboutToUpdate,
      value: e.target.value,
    };

    newArray[index] = aboutToUpdate;

    this.clearError();
    this.setState({ [e.target.name]: e.target.value, about: newArray });
  };
  inputPricing = (e, index) => {
    let pricingToUpdate = this.state.pricing[index];
    const newArray = [...this.state.pricing];
    pricingToUpdate = {
      ...pricingToUpdate,
      value: e.target.value,
    };

    newArray[index] = pricingToUpdate;

    this.clearError();
    this.setState({ [e.target.name]: e.target.value, pricing: newArray });
  };
  handleCancel = (e, index, type) => {
    e.preventDefault();
    e.stopPropagation();
    const { about, pricing } = this.state;
    if (type === "about") {
      const newArr = [...about];
      newArr.splice(index, 1);
      this.setState({
        about: newArr,
      });
    }
    if (type === "pricing") {
      const newArr = [...pricing];
      newArr.splice(index, 1);
      this.setState({
        pricing: newArr,
      });
    }
  };
  render() {
    const expert_id = this.props && this.props.match.params.id;
    const {
      first_name,
      last_name,
      loadiing,
      designation,
      country,
      expertise,
      about,
      fields,
      gender,
      expertImage,
      role,
      industry,
      email,
      contact,

      selectedDate,
      linkedIn,
      selectedCalendar,
      skill,
      pricing,
      calendarOptions,
      unit,
    } = this.state;

    let fieldsVal = optionsFields.filter((item) => {
      return fields.includes(item.label);
    });
    let expertiseVal = optionsExpertise.filter((item) => {
      return expertise.includes(item.label);
    });

    return (
      <CRow>
        <CCol xs="12" sm="12">
          <CCard className="expert-card">
            {loadiing && <Loader />}
            <CCardHeader>
              <CButton onClick={this.handleBack} className="backBtn">
                <img src={BackArrow} className="mr-2" /> Back
              </CButton>
              <div className="update-profile-image">
                <img
                  id="output"
                  src={expertImage ? expertImage : Avatar}
                  alt="profile"
                  className="profile negative-margin"
                />
                <div className="upload-box">
                  <Input
                    type="file"
                    accept="image/*"
                    id="f-upload"
                    name="myImage"
                    onChange={this.uploadImage}
                    className="d-none"
                  />
                  <label htmlFor="f-upload" class="custom-file-upload">
                    <div className="camera-btn" onClick={this.uploadImage}>
                      <img src={CameraIcon} alt="camera" />
                    </div>
                  </label>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="first_name">First Name</CLabel>
                      <CInput
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        onChange={this.inputHandler}
                        value={first_name}
                      />
                      {this.errorShow("first_name")}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="last_name">Last Name</CLabel>
                      <CInput
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={this.inputHandler}
                        value={last_name}
                      />
                      {this.errorShow("last_name")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.inputHandler}
                        value={email}
                        disabled={expert_id}
                      />
                      {this.errorShow("email")}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="contact">Contact</CLabel>
                      <CInput
                        id="contact"
                        name="contact"
                        placeholder="Contact"
                        onChange={this.inputHandler}
                        value={contact}
                      />
                      {this.errorShow("contact")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="gender">Gender</CLabel>
                      <Select
                        custom
                        placeholder="Select gender"
                        name="gender"
                        id="gender"
                        onChange={(data) => this.handleChange(data, "gender")}
                        value={gender ? { value: gender, label: gender } : null}
                        options={optionsGender}
                      ></Select>
                      {this.errorShow("gender")}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="country">Country</CLabel>
                      <Select
                        custom
                        name="country"
                        id="country"
                        name="country"
                        placeholder="Select Country"
                        onChange={(data) => this.handleChange(data, "country")}
                        value={
                          country ? { value: country, label: country } : null
                        }
                        options={optionsCountry}
                      ></Select>
                      {this.errorShow("country")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="designation">Designation</CLabel>

                      <CInput
                        id="designation"
                        name="designation"
                        placeholder="Designation"
                        onChange={this.inputHandler}
                        value={designation}
                      />
                      {this.errorShow("designation")}
                    </CFormGroup>
                  </CCol>

                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="fields">Fields</CLabel>

                      <Select
                        isMulti
                        custom
                        placeholder="Select Fields"
                        id="fields"
                        name="fields"
                        onChange={(data) => this.handleChange(data, "fields")}
                        value={fieldsVal}
                        options={optionsFields}
                      ></Select>
                      {this.errorShow("fields")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="role">Current Role</CLabel>

                      <Select
                        custom
                        id="role"
                        placeholder="Select Role"
                        name="role"
                        onChange={(data) => this.handleChange(data, "role")}
                        value={role ? { value: role, label: role } : null}
                        options={optionsRole}
                      ></Select>
                      {this.errorShow("role")}
                    </CFormGroup>
                  </CCol>

                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="industry">Current Industry</CLabel>

                      <Select
                        custom
                        id="industry"
                        name="industry"
                        placeholder="Select Industry"
                        onChange={(data) => this.handleChange(data, "industry")}
                        value={
                          industry ? { value: industry, label: industry } : null
                        }
                        options={optionsIndustry}
                      ></Select>
                      {this.errorShow("industry")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="linkedIn">LinkedIn Link</CLabel>
                      <CInput
                        name="linkedIn"
                        id="linkedIn"
                        onChange={this.inputHandler}
                        placeholder="LinkedIn Link"
                        value={linkedIn}
                      />
                      {this.errorShow("linkedIn")}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="selectedCalendar">Calendar Name</CLabel>

                      <Select
                        custom
                        name="selectedCalendar"
                        id="selectedCalendar"
                        name="selectedCalendar"
                        placeholder="Select Calendar Name"
                        onChange={(data) =>
                          this.handleChange(data, "calendarId")
                        }
                        value={selectedCalendar}
                        options={calendarOptions}
                      ></Select>
                      {this.errorShow("selectedCalendar")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  {pricing && pricing.length > 0 && (
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="pricing">Pricing</CLabel>
                        <div class="d-flex justify-content-between add-list">
                          <CLabel htmlFor="pricing">
                            Enter Price of each service
                          </CLabel>
                        </div>

                        {pricing &&
                          pricing.length > 0 &&
                          pricing.map((el, index) => {
                            return (
                              <div className="d-flex align-items-center mb-2 ">
                                {el.serviceName}
                                <div>
                                  <CInput
                                    type="number"
                                    id={`pricing${el.id}`}
                                    name={`pricing${el.id}`}
                                    placeholder="Price"
                                    autoComplete={`pricing${el.id}`}
                                    onChange={(e) => {
                                      this.inputPricing(e, index);
                                    }}
                                    value={el.value}
                                  />
                                  <Select
                                    custom
                                    name={`pricing${el.unit}`}
                                    id={`pricing${el.unit}`}
                                    placeholder="Select Unit"
                                    onChange={(data) =>
                                      this.handleUnit(data, "unit", index)
                                    }
                                    value={
                                      el.unit
                                        ? { value: el.unit, label: el.unit }
                                        : null
                                    }
                                    options={optionsUnit}
                                  ></Select>
                                </div>
                              </div>
                            );
                          })}
                        {this.errorShow("pricing")}
                      </CFormGroup>
                    </CCol>
                  )}
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="skill">Skill</CLabel>

                      <Select
                        custom
                        id="skill"
                        placeholder="Select Skill"
                        name="skill"
                        onChange={(data) => this.handleChange(data, "skill")}
                        value={skill ? { value: skill, label: skill } : null}
                        options={optionsSkill}
                      ></Select>
                      {this.errorShow("skill")}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    {skill && (
                      <CFormGroup>
                        <CLabel htmlFor="expertise">{skill}</CLabel>

                        <Select
                          isMulti
                          custom
                          id="expertise"
                          placeholder="Select areas of your expertise/specialities"
                          name="expertise"
                          value={expertiseVal}
                          options={optionsExpertise}
                          onChange={(e) => this.handleChange(e, "expertise")}
                        ></Select>
                        {this.errorShow("expertise")}
                      </CFormGroup>
                    )}
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="about">About</CLabel>
                      <div
                        onClick={(e) => this.handlePlusButton(e, "about")}
                        class="d-flex justify-content-between add-list"
                      >
                        <CLabel htmlFor="pros">Add Information</CLabel>
                        <button className="icon">
                          <img src={ADD} className="ml-3" />
                        </button>
                      </div>
                      {this.errorShow("about")}
                      {about &&
                        about.length > 0 &&
                        about.map((el, index) => {
                          return (
                            <div className="d-flex align-items-center mb-2 ">
                              <CTextarea
                                rows="6"
                                id={`about${index}`}
                                name={`about${index}`}
                                placeholder={`${index + 1}.`}
                                autoComplete={`about${index}`}
                                onChange={(e) => {
                                  this.inputAbout(e, index);
                                }}
                                value={el.value}
                              />
                              <button
                                className="icon"
                                onClick={(e) =>
                                  this.handleCancel(e, index, "about")
                                }
                              >
                                <img src={CANCEL} className="ml-3" />
                              </button>
                            </div>
                          );
                        })}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <div className="text-right">
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.resetState}
                  className="ml-2"
                >
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addExpert,
      addImage,
      fetchOneExpert,
      editExpert,
      fetchService,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddExpert)
);
