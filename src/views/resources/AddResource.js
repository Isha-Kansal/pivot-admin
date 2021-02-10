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
  CSelect,
} from "@coreui/react";
import CameraIcon from "../../assets/icons/photo-camera.svg";
import ADD from "../../assets/icons/add.svg";
import CANCEL from "../../assets/icons/cancel.svg";
import { Input } from "reactstrap";
import CIcon from "@coreui/icons-react";
import Avatar from "../../assets/icons/avatar.png";
class AddResource extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      format: "",
      pricing: "",

      uniqueSellingProposition: "",
      errorType: "",
      errorText: "",
      expertImage: null,
      plusBit: false,
      pros: [],
      cons: [],
      details: [],
    };
  }
  // uploadImage = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       // props.setImage(reader.result);
  //       this.setState({
  //         expertImage: reader.result,
  //       });
  //     }.bind(this);
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };
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
    // let prosToUpdate = this.state.pros[index];
    // const newArray = [...this.state.pros];
    // prosToUpdate = {
    //   ...prosToUpdate,
    //   value: e.target.value,
    // };
    // newArray[index] = prosToUpdate;

    this.clearError();
    this.setState({ [e.target.name]: e.target.value });
  };
  inputProsCons = (e, index, type) => {
    if (type === "prosAdd") {
      let prosToUpdate = this.state.pros[index];
      const newArray = [...this.state.pros];
      prosToUpdate = {
        ...prosToUpdate,
        value: e.target.value,
      };
      newArray[index] = prosToUpdate;

      this.clearError();
      this.setState({ [e.target.name]: e.target.value, pros: newArray });
    }
    if (type === "consAdd") {
      let consToUpdate = this.state.cons[index];
      const newArray = [...this.state.cons];
      consToUpdate = {
        ...consToUpdate,
        value: e.target.value,
      };
      newArray[index] = consToUpdate;

      this.clearError();
      this.setState({ [e.target.name]: e.target.value, cons: newArray });
    }
    if (type === "detailsAdd") {
      let detailsToUpdate = this.state.details[index];
      const newArray = [...this.state.details];
      detailsToUpdate = {
        ...detailsToUpdate,
        value: e.target.value,
      };
      newArray[index] = detailsToUpdate;

      this.clearError();
      this.setState({ [e.target.name]: e.target.value, details: newArray });
    }
  };
  onSubmit = (e) => {
    const {
      name,
      format,
      pricing,

      uniqueSellingProposition,
    } = this.state;

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
    if (format === "") {
      this.setState({
        errorType: "format",
        errorText: (
          <span className="text-danger">
            <b>Select any format</b>
          </span>
        ),
      });
      return;
    }
    if (pricing === "") {
      this.setState({
        errorType: "pricing",
        errorText: (
          <span className="text-danger">
            <b>Please enter type of pricing</b>
          </span>
        ),
      });
      return;
    }

    if (uniqueSellingProposition === "") {
      this.setState({
        errorType: "uniqueSellingProposition",
        errorText: (
          <span className="text-danger">
            <b>Please enter some information</b>
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
      format: "",
      pricing: "",
      details: [],
      pros: [],
      cons: [],
      uniqueSellingProposition: "",
      errorType: "",
      errorText: "",
    });
  };
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push("/resources");
  };
  handlePlusButton = (e, type) => {
    console.log("847984857840", type);
    if (type === "prosAdd") {
      const { pros } = this.state;
      const newArr = [...pros];
      e.preventDefault();
      e.stopPropagation();
      let newPros = {
        value: "",
      };
      newArr.push(newPros);
      this.setState({
        pros: newArr,
      });
    }
    if (type === "consAdd") {
      const { cons } = this.state;
      const newArr = [...cons];
      e.preventDefault();
      e.stopPropagation();
      let newCons = {
        value: "",
      };
      newArr.push(newCons);
      this.setState({
        cons: newArr,
      });
    }
    if (type === "detailsAdd") {
      const { details } = this.state;
      const newArr = [...details];
      e.preventDefault();
      e.stopPropagation();
      let newDetails = {
        value: "",
      };
      newArr.push(newDetails);
      this.setState({
        details: newArr,
      });
    }
  };
  handleCancel = (e, index, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "prosAdd") {
      const { pros } = this.state;
      console.log("94586794897894", pros);
      const newArr = [...pros];
      newArr.splice(index, 1);
      this.setState({
        pros: newArr,
      });
    }
    if (type === "consAdd") {
      const { cons } = this.state;
      console.log("94586794897894", cons);
      const newArr = [...cons];
      newArr.splice(index, 1);
      this.setState({
        cons: newArr,
      });
    }
    if (type === "detailsAdd") {
      const { details } = this.state;
      console.log("94586794897894", details);
      const newArr = [...details];
      newArr.splice(index, 1);
      this.setState({
        details: newArr,
      });
    }
  };
  render() {
    const {
      name,
      format,
      pricing,
      uniqueSellingProposition,

      expertImage,
      plusBit,
      pros,
      cons,
      details,
    } = this.state;

    return (
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <CButton onClick={this.handleBack} className="backBtn">
                <i className="fas fa-arrow-left"></i>Back
              </CButton>
              {/* <div className="update-profile-image">
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
              </div> */}
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
                    <CLabel htmlFor="format">Format</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="format"
                      id="format"
                      onChange={this.inputHandler}
                    >
                      <option value="select">Select</option>
                      <option value="remote">Remote</option>
                    </CSelect>
                    {this.errorShow("format")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="pricing">Pricing</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="pricing"
                      id="pricing"
                      onChange={this.inputHandler}
                    >
                      <option value="select">Select</option>
                      <option value="economical">Economical</option>
                    </CSelect>
                    {this.errorShow("pricing")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prosCons">Pros & Cons</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <div class="d-flex justify-content-between add-list">
                      <CLabel htmlFor="pros">Pros</CLabel>
                      <button
                        className="icon"
                        onClick={(e) => this.handlePlusButton(e, "prosAdd")}
                      >
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>

                    {pros &&
                      pros.length > 0 &&
                      pros.map((el, index) => {
                        return (
                          <div className="d-flex align-items-center mb-2 ">
                            {/* <input value={el.value} /> */}
                            <CInput
                              type="text"
                              id={`pros${index}`}
                              name={`pros${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`pros${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "prosAdd");
                              }}
                              // value={`pros${index}`}
                            />
                            <button
                              className="icon"
                              onClick={(e) =>
                                this.handleCancel(e, index, "prosAdd")
                              }
                            >
                              <img src={CANCEL} className="ml-3" />
                            </button>
                          </div>
                        );
                      })}

                    {/* {this.errorShow("fields")} */}
                    <div class="d-flex justify-content-between add-list">
                      <CLabel htmlFor="cons">Cons</CLabel>
                      <button
                        className="icon"
                        onClick={(e) => this.handlePlusButton(e, "consAdd")}
                      >
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>

                    {cons &&
                      cons.length > 0 &&
                      cons.map((el, index) => {
                        return (
                          <div className="d-flex align-items-center mb-2">
                            {/* <input value={el.value} /> */}
                            <CInput
                              type="text"
                              id={`cons${index}`}
                              name={`cons${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`cons${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "consAdd");
                              }}
                              // value={`pros${index}`}
                            />
                            <button
                              className="icon"
                              onClick={(e) =>
                                this.handleCancel(e, index, "consAdd")
                              }
                            >
                              <img src={CANCEL} className="ml-3" />
                            </button>
                          </div>
                        );
                      })}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="details">Details</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <div class="d-flex justify-content-between add-list">
                      <CLabel htmlFor="addDetails">Add</CLabel>
                      <button
                        className="icon"
                        onClick={(e) => this.handlePlusButton(e, "detailsAdd")}
                      >
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>

                    {details &&
                      details.length > 0 &&
                      details.map((el, index) => {
                        return (
                          <div className="d-flex align-items-center mb-2">
                            {/* <input value={el.value} /> */}
                            <CInput
                              type="text"
                              id={`details${index}`}
                              name={`details${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`details${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "detailsAdd");
                              }}
                              // value={`pros${index}`}
                            />

                            <button
                              className="icon"
                              onClick={(e) =>
                                this.handleCancel(e, index, "detailsAdd")
                              }
                            >
                              <img src={CANCEL} className="ml-3" />
                            </button>
                          </div>
                        );
                      })}

                    {/* {this.errorShow("fields")} */}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="uniqueSellingProposition">
                      Unique Selling Proposition
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="uniqueSellingProposition"
                      id="uniqueSellingProposition"
                      rows="9"
                      onChange={this.inputHandler}
                      placeholder="Content..."
                      value={uniqueSellingProposition}
                    />
                    {this.errorShow("uniqueSellingProposition")}
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

export default AddResource;
