import React, { Component } from "react";
// import DateTimePicker from "react-datetime-picker";
// import { PopupWidget } from "react-calendly";
import {
  addExpert,
  addImage,
  fetchOneExpert,
  editExpert,
} from "../store/action";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import BackArrow from "../../assets/icons/left-arrow.svg";
import Loader from "../../loader";
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
  CSelect,
} from "@coreui/react";
// import { InlineWidget } from "react-calendly";
import Select from "react-select";
import CameraIcon from "../../assets/icons/photo-camera.svg";
import { Input } from "reactstrap";
import CIcon from "@coreui/icons-react";
import Avatar from "../../assets/icons/avatar.png";
import {
  optionsFields,
  optionsGender,
  optionsCountry,
  optionsDesignation,
  optionsExpertise,
  optionsRole,
  optionsIndustry,
  optionsExperience,
  optionsSkill,
  optionsRate,
  optionsService,
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
      about: "",
      errorType: "",
      errorText: "",
      service: "",
      rate: "",
      expertImage: null,
      selectedDate: new Date(),
      linkedIn: "",
    };
  }
  componentDidMount() {
    const expert_id = this.props && this.props.match.params.id;

    if (expert_id) {
      this.setState({
        loadiing: true,
      });
      this.props.fetchOneExpert(`expert/${expert_id}`, (value) => {
        const {
          first_name,
          last_name,
          gender,
          country,
          designation,
          fields,
          role,
          industry,
          skills,
          service,
          email,
          contact_no,
          linkedIn,

          price,
          info,
        } = value.data.expert;

        this.setState({
          loadiing: false,
          first_name,
          last_name,
          gender,
          country,
          designation,
          fields,
          role,
          industry,
          email,
          contact: contact_no,
          service,
          rate: price,
          linkedIn,
          about: info,
          skill: skills && skills[0] && skills[0].label,
          expertise: skills && skills[0] && skills[0].values,
        });
      });
    }
  }
  uploadImage = (event) => {
    this.clearError();
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function () {
        this.callApiAddImage((reader && reader.result) || "");
        // props.setImage(reader.result);
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
  handleChange = (data, type) => {
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

    if (type === "service") {
      this.setState({
        service: data.value,
      });
    }
    if (type === "skill") {
      this.setState({
        skill: data.value,
      });
    }
    if (type === "rate") {
      this.setState({
        rate: data.value,
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

      role,
      industry,
      expertise,
      fields,
      about,
      service,
      rate,
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

    if (service === "") {
      this.setState({
        errorType: "service",
        errorText: (
          <span className="text-danger">
            <b>Select your service</b>
          </span>
        ),
      });
      return;
    }
    if (rate === "") {
      this.setState({
        errorType: "rate",
        errorText: (
          <span className="text-danger">
            <b>Please enter the rate</b>
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

    if (about === "") {
      this.setState({
        errorType: "about",
        errorText: (
          <span className="text-danger">
            <b>Please enter some information about you</b>
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

      service,
      rate,
      linkedIn,
      about,
      skill,
      expertise,
      expertImage,
      email,
      contact,
    } = this.state;
    let skillObj = [{ label: skill, values: expertise }];
    const timeZone = moment.tz.guess(true);
    console.log("9450690407909470904", timeZone);
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
      service,
      email,
      contact_no: contact ? contact : "",
      linkedIn,

      price: rate,
      info: about,
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
      service,
      rate,
      linkedIn,
      about,
      expertImage,
    } = this.state;
    const timeZone = moment.tz.guess(true);
    let skillObj = [{ label: skill, values: expertise }];

    let obj = {
      // profile_pic:expertImage,
      first_name,
      last_name,
      gender,
      country,
      role,
      industry,
      skills: skillObj,
      fields,
      info: about,
      linkedIn,
      designation,
      price: rate,
      service,
      time_zone: timeZone,
      email,
      contact_no: contact ? contact : "",
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
    this.props.addImage("upload/profile-picture", obj, (value) => {
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
      about: "",
      errorType: "",
      errorText: "",
      service: "",
      rate: "",
      linkedIn: "",
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
      service,
      rate,
      selectedDate,
      linkedIn,
      skill,
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
                  style={{
                    minWidth: "50px",
                    height: "50px",
                  }}
                  src={expertImage ? expertImage : Avatar}
                  alt="profile"
                  className="profile negative-margin"
                />
                <div>
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
                      <CLabel htmlFor="service">Service</CLabel>

                      <Select
                        custom
                        id="service"
                        name="service"
                        placeholder="Select Service"
                        onChange={(data) => this.handleChange(data, "service")}
                        value={
                          service ? { value: service, label: service } : null
                        }
                        options={optionsService}
                      ></Select>
                      {this.errorShow("service")}
                    </CFormGroup>
                  </CCol>

                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="rate">Rate</CLabel>

                      <CInput
                        id="rate"
                        placeholder="Rate"
                        name="rate"
                        onChange={this.inputHandler}
                        value={rate}
                      />
                      {this.errorShow("rate")}
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
                        placeholder="LinkedIn LInk"
                        value={linkedIn}
                      />
                      {this.errorShow("linkedIn")}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="about">About</CLabel>
                      <CTextarea
                        name="about"
                        id="about"
                        rows="9"
                        onChange={this.inputHandler}
                        placeholder="Content..."
                        value={about}
                      />
                      {this.errorShow("about")}
                    </CFormGroup>
                  </CCol>
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

                  {skill && (
                    <CCol xs="6">
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
                    </CCol>
                  )}
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
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddExpert)
);
