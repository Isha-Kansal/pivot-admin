import React, { Component } from "react";

import { NotificationManager } from "react-notifications";
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
import Loader from "../../loader";
import { FormText } from "reactstrap";
import CIcon from "@coreui/icons-react";
import { loginByAdmin } from "../store/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
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
    if (name === "") {
      this.setState({ errorText: "Name can not be empty", errorType: "name" });
    } else if (password === "") {
      this.setState({
        errorText: "Password can not be empty",
        errorType: "password",
      });
    } else this.authenticateAdmin();
  };
  authenticateAdmin = () => {
    const { name, password } = this.state;
    this.setState({
      loading: true,
    });
    let formData = {
      email: name,
      password: password,
    };

    this.props.loginByAdmin("user/login", formData, (value) => {
      console.log("9458794597894789", value);
      this.setState({
        loading: false,
      });

      if (value.status === 200) {
        NotificationManager.success(value.message, "", 1000);

        localStorage.setItem("isLoggedIn", true);

        this.props.history.push("/users");
      } else {
        NotificationManager.error("Please enter valid credentials", "", 1000);
        this.setState({
          name: "",
          password: "",
        });
      }
    });
  };
  render() {
    const { errorText, errorType, loading, name, password } = this.state;
    console.log("489r79049709", loading);
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                {loading && <Loader />}
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.onHandleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <div className="mb-3">
                        <CInputGroup>
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
                            value={name}
                          />
                        </CInputGroup>
                        <p className="mb-0">
                          {errorType === "name" && (
                            <FormText color="danger" className="error">
                              {errorText}
                            </FormText>
                          )}
                        </p>
                      </div>
                      <div className="mb-4">
                        <CInputGroup>
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
                            value={password}
                          />
                        </CInputGroup>
                        <p className="mb-0">
                          {" "}
                          {errorType === "password" && (
                            <FormText color="danger" className="error">
                              {errorText}
                            </FormText>
                          )}
                        </p>
                      </div>

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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginByAdmin,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
