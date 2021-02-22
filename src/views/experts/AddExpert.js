import React, { Component } from "react";
// import DateTimePicker from "react-datetime-picker";
// import { PopupWidget } from "react-calendly";
import BackArrow from "../../assets/icons/left-arrow.svg";
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
      expertise: "",
      experience: "",
      role: "",
      industry: "",
      fields: "",
      about: "",
      errorType: "",
      errorText: "",
      service: "",
      rate: "",
      expertImage: null,
      selectedDate: new Date(),
    };
  }
  uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function () {
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
    if (type === "fields") {
      let arr = data.map((el) => {
        return el.value;
      });
      this.setState({
        fields: arr,
      });
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
      this.setState({
        expertise: data.value,
      });
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
    if (type === "experience") {
      this.setState({
        experience: data.value,
      });
    }
    if (type === "service") {
      this.setState({
        service: data.value,
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
    const {
      first_name,
      last_name,
      email,
      contact,
      gender,
      country,
      designation,
      experience,
      role,
      industry,
      expertise,
      fields,
      about,
      service,
      rate,
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

    if (contact === "") {
      this.setState({
        errorType: "contact",
        errorText: <span className="text-danger">Mobile number is empty</span>,
        loading: false,
      });

      return;
    } else if (contact.length < 10 || contact.length > 10) {
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
    } else if (contact !== "") {
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
    if (expertise === "") {
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

    if (experience === "") {
      this.setState({
        errorType: "experience",
        errorText: (
          <span className="text-danger">
            <b>Select your experience</b>
          </span>
        ),
      });
      return;
    }

    if (fields === "") {
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
            <b>Select your rate</b>
          </span>
        ),
      });
      return;
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
      expertise: "",
      experience: "",
      role: "",
      industry: "",
      fields: "",
      about: "",
      errorType: "",
      errorText: "",
      service: "",
      rate: "",

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
    const {
      first_name,
      last_name,
      experience,
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
    } = this.state;
    let fieldsVal = optionsFields.filter((item) => {
      return fields.includes(item.label);
    });
    return (
      <CRow>
        <CCol xs="12" sm="12">
          <CCard className="expert-card">
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

                      <Select
                        custom
                        id="designation"
                        name="designation"
                        placeholder="Select Designation"
                        onChange={(e) => this.handleChange(e, "designation")}
                        value={designation}
                        options={optionsDesignation}
                      ></Select>
                      {this.errorShow("designation")}
                    </CFormGroup>
                  </CCol>

                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="expertise">Expertise</CLabel>

                      <Select
                        isMulti
                        custom
                        id="expertise"
                        placeholder="Select Your expert areas"
                        name="expertise"
                        value={expertise}
                        options={optionsExpertise}
                        onChange={(e) => this.handleChange(e, "expertise")}
                      ></Select>
                      {this.errorShow("expertise")}
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
                        onChange={(e) => this.handleChange(e, "industry")}
                        value={industry}
                        options={optionsIndustry}
                      ></Select>
                      {this.errorShow("industry")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="experience">Work Experience</CLabel>

                      <Select
                        custom
                        id="experience"
                        name="experience"
                        placeholder="Select Experience"
                        onChange={(e) => this.handleChange(e, "experience")}
                        value={experience}
                        options={optionsExperience}
                      ></Select>
                      {this.errorShow("experience")}
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
                      <CLabel htmlFor="service">Service</CLabel>

                      <Select
                        custom
                        id="service"
                        name="service"
                        placeholder="Select Service"
                        onChange={(e) => this.handleChange(e, "service")}
                        value={service}
                        options={optionsService}
                      ></Select>
                      {this.errorShow("service")}
                    </CFormGroup>
                  </CCol>

                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="rate">Rate</CLabel>

                      <Select
                        custom
                        id="rate"
                        placeholder="Select Rate"
                        name="rate"
                        onChange={(e) => this.handleChange(e, "rate")}
                        value={rate}
                        options={optionsRate}
                      ></Select>
                      {this.errorShow("rate")}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    {/* <CFormGroup>
                      <CLabel htmlFor="dateTime">Select Availability</CLabel>
                      <InlineWidget
                        pageSettings={{
                          backgroundColor: "ffffff",
                          hideEventTypeDetails: false,
                          hideLandingPageDetails: true,
                          primaryColor: "00a2ff",
                          textColor: "4d5055",
                        }}
                        prefill={{
                          email: "test@test.com",
                          firstName: "Jon",
                          lastName: "Snow",
                          name: "Jon Snow",
                        }}
                        url="https://calendly.com/ikansal"
                      />

                      {this.errorShow("dateTime")}
                    </CFormGroup> */}
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

export default AddExpert;
