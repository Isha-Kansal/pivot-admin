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
  CInputFile,
} from "@coreui/react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import {
  addResource,
  addResourceImage,
  setImage,
  fetchOneResource,
} from "../store/action";

import {
  optionsFormat,
  optionsPricing,
  optionsCategory,
  optionsPace,
} from "./ResourcesFieldsData";
import CameraIcon from "../../assets/icons/photo-camera.svg";
import ADD from "../../assets/icons/add.svg";
import CANCEL from "../../assets/icons/cancel.svg";
import { Input } from "reactstrap";
import CIcon from "@coreui/icons-react";
import Avatar from "../../assets/icons/avatar.png";
import BackArrow from "../../assets/icons/left-arrow.svg";
class AddResource extends Component {
  constructor(props) {
    super();

    this.state = {
      name: "",
      addPrice: "",
      format: "",
      pricing: "",
      category: [],
      uniqueSellingProposition: "",
      errorType: "",
      errorText: "",
      resourceImage: null,
      plusBit: false,
      pros: [],
      cons: [],
      details: [],
      pace: "",
      websiteLink: "",
      resourceData: {},
    };
  }
  componentDidMount() {
    const resource_id = this.props && this.props.match.params.id;
    if (resource_id) {
      this.props.fetchOneResource(`resource/${resource_id}`, (value) => {
        console.log("8965789057dfhgfh0950697", value.data.resource);
        const {
          title,
          format,
          price,
          category,
          pace,
          website,
          unique_selling_proposition,
        } = value.data.resource;
        this.setState({
          resourceData: value.data.resource,
          name: title,
          format,
          pricing: price,
          category,
          pace,
          websiteLink: website,
          uniqueSellingProposition: unique_selling_proposition,
        });
        // setResource(value.data.resource);
        // setLoading(false);
      });
    }
  }
  uploadImage = (event) => {
    this.clearError();

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function () {
        // props.setImage(reader.result);
        this.setState({
          resourceImage: reader.result,
        });
      }.bind(this);
      this.props.setImage(reader.result);
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
  inputProsCons = (e, index, type) => {
    if (type === "prosAdd") {
      let prosToUpdate = this.state.pros[index];
      const newArray = [...this.state.pros];
      // prosToUpdate = {
      //   ...prosToUpdate,
      //   value: e.target.value,
      // };
      prosToUpdate = e.target.value;
      newArray[index] = prosToUpdate;

      this.clearError();
      this.setState({ [e.target.name]: e.target.value, pros: newArray });
    }
    if (type === "consAdd") {
      let consToUpdate = this.state.cons[index];
      const newArray = [...this.state.cons];
      // consToUpdate = {
      //   ...consToUpdate,
      //   value: e.target.value,
      // };
      consToUpdate = e.target.value;
      newArray[index] = consToUpdate;

      this.clearError();
      this.setState({ [e.target.name]: e.target.value, cons: newArray });
    }
    if (type === "detailsAdd") {
      let detailsToUpdate = this.state.details[index];
      const newArray = [...this.state.details];
      // detailsToUpdate = {
      //   ...detailsToUpdate,
      //   value: e.target.value,
      // };
      detailsToUpdate = e.target.value;
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
      details,
      uniqueSellingProposition,
      pros,
      cons,
      category,
      pace,
      websiteLink,
      addPrice,
      resourceImage,
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
    // if (resourceImage === null) {
    //   this.setState({
    //     errorType: "file-input",
    //     errorText: (
    //       <span className="text-danger">
    //         <b>Please select an image</b>
    //       </span>
    //     ),
    //   });
    //   return;
    // }
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
    if (pricing === "Others" && addPrice === "") {
      this.setState({
        errorType: "addPrice",
        errorText: (
          <span className="text-danger">
            <b>Please enter price</b>
          </span>
        ),
      });
      return;
    }
    if (category.length === 0) {
      this.setState({
        errorType: "category",
        errorText: (
          <span className="text-danger">
            <b>Please enter category</b>
          </span>
        ),
      });
      return;
    }
    if (pace === "") {
      this.setState({
        errorType: "pace",
        errorText: (
          <span className="text-danger">
            <b>Please enter pace</b>
          </span>
        ),
      });
      return;
    }
    if (websiteLink === "") {
      this.setState({
        errorType: "websiteLink",
        errorText: (
          <span className="text-danger">
            <b>Please enter website link</b>
          </span>
        ),
      });
      return;
    }

    if (websiteLink !== "") {
      let filter = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

      if (!filter.test(websiteLink)) {
        this.setState({
          errorType: "websiteLink",
          errorText: (
            <span className="text-danger">
              <b> Please enter valid website link</b>
            </span>
          ),
        });
        return;
      }
    }

    if (pros.length === 0) {
      this.setState({
        errorType: "pros",
        errorText: (
          <span className="text-danger">
            <b>Please add some pros</b>
          </span>
        ),
      });
      return;
    }
    if (cons.length === 0) {
      this.setState({
        errorType: "cons",
        errorText: (
          <span className="text-danger">
            <b>Please add some cons</b>
          </span>
        ),
      });
      return;
    }
    if (details.length === 0) {
      this.setState({
        errorType: "details",
        errorText: (
          <span className="text-danger">
            <b>Please add some details</b>
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
    // this.callApiAddImage()
    this.callApiAddResource();
  };
  callApiAddImage = () => {
    const { resourceImage } = this.state;
    let obj = {
      profile_pic: resourceImage,
    };
    this.props.addResourceImage("resource/create", obj, (value) => {
      // this.callApiAddResource();
    });
  };
  callApiAddResource = () => {
    const {
      name,
      format,
      pricing,
      websiteLink,
      category,
      details,
      pros,
      cons,
      uniqueSellingProposition,
      pace,
    } = this.state;
    let obj = {
      title: name,
      format,
      price: pricing,
      website: websiteLink,
      category,
      pros,
      cons,
      info: details,
      unique_selling_proposition: uniqueSellingProposition,
      pace,
    };

    this.props.addResource("resource/create", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Resource added successfully", "", 1000);
        this.props.history.push("/resources");
      }
    });
  };
  resetState = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      format: "",
      pricing: "",
      category: [],
      details: [],
      pros: [],
      cons: [],
      resourceImage: null,
      uniqueSellingProposition: "",
      errorType: "",
      errorText: "",
      pace: "",
      websiteLink: "",
    });
  };
  handleBack = (e) => {
    e.preventDefault();
    this.props.history.push("/resources");
  };
  handlePlusButton = (e, type) => {
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

      const newArr = [...pros];
      newArr.splice(index, 1);
      this.setState({
        pros: newArr,
      });
    }
    if (type === "consAdd") {
      const { cons } = this.state;

      const newArr = [...cons];
      newArr.splice(index, 1);
      this.setState({
        cons: newArr,
      });
    }
    if (type === "detailsAdd") {
      const { details } = this.state;

      const newArr = [...details];
      newArr.splice(index, 1);
      this.setState({
        details: newArr,
      });
    }
  };

  handleSelect = (data, type) => {
    this.clearError();
    if (type === "format") {
      this.setState({
        format: data.value,
      });
    }
    if (type === "pricing") {
      this.setState({
        pricing: data.value,
      });
    }
    if (type === "category") {
      const updateCategory = this.state.category.slice();

      let arr = data.map((el) => {
        return el.value;
      });
      // if (updateCategory.findIndex((item) => arr.includes(item)) === -1) {
      //   updateCategory.push(...arr);
      // }

      this.setState({
        category: arr,
      });
    }
    if (type === "pace") {
      this.setState({
        pace: data.value,
      });
    }
  };
  render() {
    const {
      name,
      format,
      pricing,
      uniqueSellingProposition,
      category,
      resourceImage,
      plusBit,
      pros,
      cons,
      details,
      pace,
      websiteLink,
      addPrice,
      resourceData,
    } = this.state;

    let categoryVal = optionsCategory.filter((reason) => {
      return category.includes(reason.label);
    });

    return (
      <CRow>
        <CCol xs="12" sm="12">
          <CCard className="expert-card">
            <CCardHeader>
              <CButton onClick={this.handleBack} className="backBtn">
                <img src={BackArrow} className="mr-2" /> Back
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
                  <CLabel col md="3" htmlFor="file-input">
                    Image
                  </CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile
                      type="file"
                      accept="image/*"
                      id="file-input"
                      name="file-input"
                      onChange={this.uploadImage}
                    />
                    {this.errorShow("file-input")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="format">Format</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="format"
                      placeholder="Select Format"
                      id="format"
                      // value={
                      //   format && format !== ""
                      //     ? { value: format, label: format }
                      //     : Object.keys(resourceData).length > 0
                      //     ? {
                      //         value: resourceData.format,
                      //         label: resourceData.format,
                      //       }
                      //     : null
                      // }
                      value={format ? { value: format, label: format } : null}
                      options={optionsFormat}
                      onChange={(data) => this.handleSelect(data, "format")}
                    ></Select>
                    {this.errorShow("format")}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="pricing">Price</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="pricing"
                      placeholder="Select Price"
                      id="pricing"
                      // value={
                      //   pricing && pricing !== ""
                      //     ? { value: pricing, label: pricing }
                      //     : Object.keys(resourceData).length > 0
                      //     ? {
                      //         value: resourceData.price,
                      //         label: resourceData.price,
                      //       }
                      //     : null
                      // }
                      value={
                        pricing ? { value: pricing, label: pricing } : null
                      }
                      options={optionsPricing}
                      onChange={(data) => this.handleSelect(data, "pricing")}
                    ></Select>
                    {this.errorShow("pricing")}
                  </CCol>
                </CFormGroup>

                {pricing === "Others" && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="addPrice">Add Price</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="number"
                        id="addPrice"
                        name="addPrice"
                        placeholder="Add Price"
                        onChange={this.inputHandler}
                        value={addPrice}
                      />
                      {this.errorShow("addPrice")}
                    </CCol>
                  </CFormGroup>
                )}

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="category">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      isMulti
                      custom
                      name="category"
                      placeholder="Select Category"
                      id="category"
                      value={categoryVal}
                      options={optionsCategory}
                      onChange={(data) => this.handleSelect(data, "category")}
                    ></Select>
                    {this.errorShow("category")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="pace">Pace</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="pace"
                      placeholder="Select Pace"
                      id="pace"
                      value={pace ? { value: pace, label: pace } : null}
                      // value={
                      //   pace && pace !== ""
                      //     ? { value: pace, label: pace }
                      //     : Object.keys(resourceData).length > 0
                      //     ? {
                      //         value: resourceData.pace,
                      //         label: resourceData.pace,
                      //       }
                      //     : null
                      // }
                      options={optionsPace}
                      onChange={(data) => this.handleSelect(data, "pace")}
                    ></Select>
                    {this.errorShow("pace")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="websiteLink">Website Link</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="websiteLink"
                      name="websiteLink"
                      placeholder="Website Link"
                      onChange={this.inputHandler}
                      value={websiteLink}
                    />
                    {this.errorShow("websiteLink")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prosCons">Pros & Cons</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <div
                      onClick={(e) => this.handlePlusButton(e, "prosAdd")}
                      class="d-flex justify-content-between add-list"
                    >
                      <CLabel htmlFor="pros">Add Pros</CLabel>
                      <button className="icon">
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>
                    {this.errorShow("pros")}
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
                              value={resourceData && resourceData.pros}
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
                    <div
                      onClick={(e) => this.handlePlusButton(e, "consAdd")}
                      class="d-flex justify-content-between add-list"
                    >
                      <CLabel htmlFor="cons">Add Cons</CLabel>
                      <button className="icon">
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>
                    {this.errorShow("cons")}
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
                              value={resourceData && resourceData.cons}
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
                    <div
                      class="d-flex justify-content-between add-list"
                      onClick={(e) => this.handlePlusButton(e, "detailsAdd")}
                    >
                      <CLabel htmlFor="addDetails">Add Details</CLabel>
                      <button className="icon">
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>
                    {this.errorShow("details")}
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
                              value={resourceData && resourceData.info}
                            />

                            <button
                              className="icon"
                              onClick={(e) =>
                                this.handleCancel(e, index, "detailsAdd")
                              }
                            >
                              <img src={CANCEL} className="ml-3" />
                            </button>
                            {/* {this.errorShow("details")} */}
                          </div>
                        );
                      })}
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
  return {
    saveResourceData: state.LoginAndNavigationReducer.saveResourceData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addResource,
      addResourceImage,
      fetchOneResource,
      setImage,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddResource)
);
