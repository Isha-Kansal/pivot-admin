import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { FormText } from "reactstrap";
import CIcon from "@coreui/icons-react";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      password: "",
      errorText: "",
      errorType: "",

      loading: false,
    };
  }
  handleChange = (e, type) => {
    e.preventDefault();
    this.setState({
      [type]: e.target.value,
      errorText: "",
      errorType: "",
    });
  };
  onHandleSubmit = (e) => {
    e.preventDefault();

    const { name, password } = this.state;
    // if (name === "") {
    //   this.setState({ errorText: "Name can not be empty", errorType: "name" });
    // } else if (password === "") {
    //   this.setState({
    //     errorText: "Password can not be empty",
    //     errorType: "password",
    //   });
    // }
    // else this.authenticateAdmin();

    this.props.history.push("/users");
  };

  render() {
    const { errorText, errorType, loading } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.onHandleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(e) => this.handleChange(e, "name")}
                          value={this.state.name}
                        />
                        {errorType === "name" && (
                          <FormText color="danger">{errorText}</FormText>
                        )}
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(e) => this.handleChange(e, "password")}
                          value={this.state.password}
                        />
                        {errorType === "password" && (
                          <FormText color="danger">{errorText}</FormText>
                        )}
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={this.onHandleSubmit}
                          >
                            Login
                          </CButton>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
