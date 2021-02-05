import React, { Component } from "react";
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
import CIcon from "@coreui/icons-react";
class AddExpert extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      designation: "",
      expertise: "",
      fields: "",
      about: "",
      errorType: "",
      errorText: "",
    };
  }
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
  onSubmit = (e) => {
    const { name, designation, expertise, fields, about } = this.state;

    if (name === "") {
      this.setState({
        errorType: "name",
        errorText: (
          <span className="text-danger">
            <b>Name should not be empty</b>
          </span>
        ),
      });
      return;
    }
    if (name !== "") {
      let filter = /^[a-zA-Z0-9]+([-_\s]{1}[a-zA-Z0-9]+)*$/;

      if (!filter.test(name)) {
        this.setState({
          errorType: "name",
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
    if (fields === "") {
      this.setState({
        errorType: "fields",
        errorText: (
          <span className="text-danger">
            <b>Please enter the fields</b>
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
      name: "",
      designation: "",
      expertise: "",
      fields: "",
      about: "",
      errorType: "",
      errorText: "",
    });
  };
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push("/experts");
  };

  render() {
    const { name, designation, expertise, about, fields } = this.state;
    console.log("AddExpertAddExpertAddExpertAddExpert");
    return (
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <CButton onClick={this.handleBack} className="backBtn">
                <i className="fas fa-arrow-left"></i>Back
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row></CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={this.inputHandler}
                      value={name}
                    />
                    {this.errorShow("name")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="designation">Designation</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="designation"
                      name="designation"
                      placeholder="Designation"
                      autoComplete="designation"
                      onChange={this.inputHandler}
                      value={designation}
                    />
                    {this.errorShow("designation")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="expertise">Expertise</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="expertise"
                      name="expertise"
                      placeholder="Expertise"
                      autoComplete="expertise"
                      onChange={this.inputHandler}
                      value={expertise}
                    />
                    {this.errorShow("expertise")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="fields">Fields</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="fields"
                      name="fields"
                      placeholder="Fields"
                      autoComplete="fields"
                      onChange={this.inputHandler}
                      value={fields}
                    />
                    {this.errorShow("fields")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="about">About</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="about"
                      id="about"
                      rows="9"
                      onChange={this.inputHandler}
                      placeholder="Content..."
                      value={about}
                    />
                    {this.errorShow("about")}
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
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
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default AddExpert;
