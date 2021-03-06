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
  addImage,
  setImage,
  editResource,
  fetchOneResource,
} from "../store/action";
import Loader from "../../loader";
import {
  optionsFormat,
  optionsPricing,
  optionsCategory,
  optionsPace,
  optionsFeaturedFormat,
  optionsUnit,
  optionsCountry,
} from "./ResourcesFieldsData";

import ADD from "../../assets/icons/add.svg";
import CANCEL from "../../assets/icons/cancel.svg";

import CIcon from "@coreui/icons-react";

import BackArrow from "../../assets/icons/left-arrow.svg";
class AddResource extends Component {
  constructor(props) {
    super();

    this.state = {
      name: "",
      addPrice: "",
      format: [],
      featuredResource: "",
      pricing: "",
      category: [],
      country: "",
      uniqueSellingProposition: "",
      errorType: "",
      errorText: "",
      resourceImage: "",
      plusBit: false,
      pros: [],
      cons: [],
      details: [],
      pace: "",
      websiteLink: [],
      resourceData: {},
      loadiing: false,
      // unit: "",
    };
  }
  componentDidMount() {
    const resource_id = this.props && this.props.match.params.id;

    if (resource_id) {
      this.setState({
        loadiing: true,
      });
      this.props.fetchOneResource(`resource?id=${resource_id}`, (value) => {
        const {
          title,
          resource_format,
          price,
          category,
          pace,
          website,
          unique_selling_proposition,
          pros,
          cons,
          info,
          country,
          profile_pic,
          is_featured,
        } = value.data.resource;
        let webLinkData;
        const detailsData = info.map((el) => {
          return { value: el };
        });
        const prosData = pros.map((el) => {
          return { value: el };
        });
        const consData = cons.map((el) => {
          return { value: el };
        });

        if (typeof website === "string") {
          webLinkData = [{ value: website }];
        } else {
          webLinkData = website.map((el) => {
            return { value: el };
          });
        }

        this.setState({
          loadiing: false,
          resourceData: value.data.resource,
          name: title.trim(),
          format: resource_format,
          country,
          // country,
          featuredResource: is_featured ? "True" : "False",

          pricing:
            price === "Economical (<USD 500 or <INR10,000)" ||
            price === "Premium (>USD 500 or >INR10,000)" ||
            price === "Free"
              ? price.value || price
              : "Others",
          addPrice: price.value || price,
          category,
          pace,
          websiteLink: webLinkData,
          uniqueSellingProposition: unique_selling_proposition,
          pros: prosData,
          cons: consData,
          details: detailsData,
          resourceImage: profile_pic,
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

    if (type === "webLinkAdd") {
      let websiteLinkToUpdate = this.state.websiteLink[index];
      const newArray = [...this.state.websiteLink];
      websiteLinkToUpdate = {
        ...websiteLinkToUpdate,
        value: e.target.value,
      };

      newArray[index] = websiteLinkToUpdate;

      this.clearError();
      this.setState({ [e.target.name]: e.target.value, websiteLink: newArray });
    }
  };
  onSubmit = (e) => {
    const resource_id = this.props && this.props.match.params.id;

    const {
      name,
      format,
      country,
      featuredResource,
      pricing,
      details,
      uniqueSellingProposition,
      pros,
      cons,
      category,
      pace,
      websiteLink,
      addPrice,
      // unit,
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
    // if (name !== "") {
    //   let filter = /^[a-zA-Z0-9]+([-_\s]{1}[a-zA-Z0-9]+)*$/;

    //   if (!filter.test(name)) {
    //     this.setState({
    //       errorType: "name",
    //       errorText: (
    //         <span className="text-danger">
    //           <b>
    //             {" "}
    //             Name should be combination of alphanumeric text, underscore,
    //             space and hyphen
    //           </b>
    //         </span>
    //       ),
    //     });
    //     return;
    //   }
    // }
    if (country === "") {
      this.setState({
        errorType: "country",
        errorText: (
          <span className="text-danger">
            <b>Select any country</b>
          </span>
        ),
      });
      return;
    }

    if (format.length === 0) {
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
    if (featuredResource === "") {
      this.setState({
        errorType: "featuredResource",
        errorText: (
          <span className="text-danger">
            <b>Select Featured Resource</b>
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
            <b>Please enter price details</b>
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
    if (websiteLink.length === 0) {
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

    //     if (websiteLink.length !== 0) {
    //       let filter = /(http(s)?:\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g;
    // console.log("756754968945684",websiteLink)
    //       if (!filter.test(websiteLink)) {
    //         this.setState({
    //           errorType: "websiteLink",
    //           errorText: (
    //             <span className="text-danger">
    //               <b> Please enter valid website link</b>
    //             </span>
    //           ),
    //         });
    //         return;
    //       }
    //     }

    if (websiteLink.length === 1 && websiteLink[0].value === "") {
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
    if (pros.length === 1 && pros[0].value === "") {
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
    if (cons.length === 1 && cons[0].value === "") {
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
    if (details.length === 1 && details[0].value === "") {
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

    if (!resource_id) {
      this.callApiAddResource();
    } else {
      this.callApiEditResource();
    }
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
          resourceImage: value.data.url,
          loadiing: false,
        });
        setImage(value.data.url);
      }
    });
  };
  callApiEditResource = () => {
    const resource_id = this.props && this.props.match.params.id;
    const {
      name,
      format,
      country,
      pricing,
      // unit,
      websiteLink,
      category,
      details,
      pros,
      cons,
      uniqueSellingProposition,
      pace,
      addPrice,
      resourceImage,
      featuredResource,
    } = this.state;
    let infodata = details.map((el) => {
      return el.value;
    });
    let prosdata = pros.map((el) => {
      return el.value;
    });
    let consdata = cons.map((el) => {
      return el.value;
    });
    let websiteLinkdata = websiteLink.map((el) => {
      return el.value;
    });

    let obj = {
      id: resource_id,
      title: name,
      format,
      country,
      isFeatured: featuredResource === "True" ? true : false,

      // price:
      //   pricing === "Others"
      //     ? { value: addPrice, unit, type: "Others" }
      //     : { value: pricing, type: pricing },
      price: pricing === "Others" ? addPrice : pricing,

      website: websiteLinkdata,
      category,
      pros: prosdata,
      cons: consdata,
      info: infodata,
      unique_selling_proposition: uniqueSellingProposition,
      pace,
    };
    if (resourceImage) {
      obj.profile_pic = resourceImage;
    }

    this.setState({
      loadiing: true,
    });
    this.props.editResource("resource/update", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Resource edit successfully", "", 1000);
        this.props.history.push("/resources");
        this.setState({
          loadiing: false,
        });
      }
    });
  };
  callApiAddResource = () => {
    const {
      name,
      format,
      country,
      featuredResource,
      pricing,
      websiteLink,
      category,
      details,
      pros,
      cons,
      uniqueSellingProposition,
      pace,
      // unit,
      addPrice,
      resourceImage,
    } = this.state;
    let infodata = details.map((el) => {
      return el.value;
    });
    let prosdata = pros.map((el) => {
      return el.value;
    });
    let consdata = cons.map((el) => {
      return el.value;
    });
    let websiteLinkdata = websiteLink.map((el) => {
      return el.value;
    });

    let obj = {
      title: name,
      format,
      country,
      isFeatured: featuredResource === "True" ? true : false,

      // price:
      //   pricing === "Others"
      //     ? { value: addPrice, unit, type: "Others" }
      //     : { value: pricing, type: pricing },

      price: pricing === "Others" ? addPrice : pricing,
      website: websiteLinkdata,
      category,
      pros: prosdata,
      cons: consdata,
      info: infodata,
      unique_selling_proposition: uniqueSellingProposition,
      pace,
    };
    if (resourceImage) {
      obj.profile_pic = resourceImage;
    }

    this.setState({
      loadiing: true,
    });
    this.props.addResource("resource/create", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Resource added successfully", "", 1000);
        this.props.history.push("/resources");
        this.setState({
          loadiing: false,
        });
      }
    });
  };
  resetState = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      format: [],
      // unit: "",
      country: "",
      featuredResource: "",
      pricing: "",
      category: [],
      details: [],
      pros: [],
      cons: [],
      resourceImage: "",
      uniqueSellingProposition: "",
      errorType: "",
      errorText: "",
      pace: "",
      websiteLink: [],
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

    if (type === "webLinkAdd") {
      const { websiteLink } = this.state;
      const newArr = [...websiteLink];
      e.preventDefault();
      e.stopPropagation();
      let newLinks = {
        value: "",
      };
      newArr.push(newLinks);
      this.setState({
        websiteLink: newArr,
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
    if (type === "webLinkAdd") {
      const { websiteLink } = this.state;

      const newArr = [...websiteLink];
      newArr.splice(index, 1);
      this.setState({
        websiteLink: newArr,
      });
    }
  };

  handleSelect = (data, type) => {
    this.clearError();
    if (type === "format") {
      let arr;
      arr = data.map((el) => {
        return el.value;
      });
      this.setState({
        format: arr,
      });
    }
    if (type === "country") {
      this.setState({
        country: data.value,
      });
    }
    if (type === "featuredResource") {
      this.setState({
        featuredResource: data.value,
      });
    }
    if (type === "pricing") {
      this.setState({
        pricing: data.value,
      });
    }
    // if (type === "addPrice") {
    //   this.setState({
    //     unit: data.value,
    //   });
    // }
    if (type === "category") {
      let arr;
      // if (data.length <= 3) {
      arr = data.map((el) => {
        return el.value;
      });
      this.setState({
        category: arr,
      });
      // } else {
      //   NotificationManager.info("You can select upto 3 only", "", 1000);
      // }
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
      country,
      featuredResource,
      pricing,
      uniqueSellingProposition,
      category,
      resourceImage,
      // unit,
      pros,
      cons,
      details,
      pace,
      websiteLink,
      addPrice,

      loadiing,
    } = this.state;

    let categoryVal = optionsCategory.filter((item) => {
      return category.includes(item.label);
    });
    let formatVal = optionsFormat.filter((item) => {
      return format.includes(item.label);
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
                    <CLabel className="text-danger">*</CLabel>
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
                    <div className="d-flex image-file">
                      <CInputFile
                        type="file"
                        accept="image/*"
                        id="file-input"
                        name="file-input"
                        onChange={this.uploadImage}
                      />
                      {resourceImage && (
                        <img
                          style={{ width: "80px", height: "80px" }}
                          src={resourceImage}
                        />
                      )}
                      {this.errorShow("file-input")}
                    </div>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="country">Country</CLabel>
                    <CLabel className="text-danger">*</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="country"
                      placeholder="Select Country"
                      id="country"
                      value={
                        country ? { value: country, label: country } : null
                      }
                      options={optionsCountry}
                      onChange={(data) => this.handleSelect(data, "country")}
                    ></Select>
                    {this.errorShow("country")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="format">Format</CLabel>
                    <CLabel className="text-danger">*</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      isMulti
                      custom
                      name="format"
                      placeholder="Select Format"
                      id="format"
                      value={formatVal}
                      // value={format ? { value: format, label: format } : null}
                      options={optionsFormat}
                      onChange={(data) => this.handleSelect(data, "format")}
                    ></Select>
                    {this.errorShow("format")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="featuredResource">
                      Featured Resource
                    </CLabel>
                    <CLabel className="text-danger">*</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="featuredResource"
                      placeholder="Select Featured Resource"
                      id="featuredResource"
                      value={
                        featuredResource
                          ? {
                              value: featuredResource,
                              label: featuredResource,
                            }
                          : null
                      }
                      options={optionsFeaturedFormat}
                      onChange={(data) =>
                        this.handleSelect(data, "featuredResource")
                      }
                    ></Select>
                    {this.errorShow("featuredResource")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="pricing">Price</CLabel>
                    <CLabel className="text-danger">*</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="pricing"
                      placeholder="Select Price"
                      id="pricing"
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
                      <CLabel htmlFor="addPrice">Price Details</CLabel>
                      <CLabel className="text-danger">*</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="text"
                        id="addPrice"
                        name="addPrice"
                        placeholder="Add Price Details"
                        onChange={this.inputHandler}
                        value={addPrice}
                      />
                      {this.errorShow("addPrice")}
                    </CCol>
                    {/* <CCol xs="6" md="3">
                      <Select
                        custom
                        name="addPrice"
                        placeholder="Add Unit"
                        id="addPrice"
                        value={unit ? { value: unit, label: unit } : null}
                        options={optionsUnit}
                        onChange={(data) => this.handleSelect(data, "addPrice")}
                      ></Select>
                    
                    </CCol> */}
                  </CFormGroup>
                )}

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="category">Category</CLabel>
                    <CLabel className="text-danger">*</CLabel>
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
                    <CLabel className="text-danger">*</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      custom
                      name="pace"
                      placeholder="Select Pace"
                      id="pace"
                      value={pace ? { value: pace, label: pace } : null}
                      options={optionsPace}
                      onChange={(data) => this.handleSelect(data, "pace")}
                    ></Select>
                    {this.errorShow("pace")}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="websiteLink">Website Links</CLabel>
                    <CLabel className="text-danger">*</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <div
                      class="d-flex justify-content-between add-list"
                      onClick={(e) => this.handlePlusButton(e, "webLinkAdd")}
                    >
                      <CLabel htmlFor="addDetails">Add Website Links</CLabel>
                      <button className="icon">
                        <img src={ADD} className="ml-3" />
                      </button>
                    </div>

                    {this.errorShow("websiteLink")}

                    {websiteLink &&
                      websiteLink.length > 0 &&
                      websiteLink.map((el, index) => {
                        return (
                          <div className="d-flex align-items-center mb-2">
                            <CInput
                              type="text"
                              id={`websiteLink${index}`}
                              name={`websiteLink${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`websiteLink${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "webLinkAdd");
                              }}
                              value={el.value}
                            />

                            <button
                              className="icon"
                              onClick={(e) =>
                                this.handleCancel(e, index, "webLinkAdd")
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
                    <CLabel htmlFor="prosCons">Pros & Cons</CLabel>
                    <CLabel className="text-danger">*</CLabel>
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
                            <CInput
                              type="text"
                              id={`pros${index}`}
                              name={`pros${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`pros${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "prosAdd");
                              }}
                              value={el.value}
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
                            <CInput
                              type="text"
                              id={`cons${index}`}
                              name={`cons${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`cons${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "consAdd");
                              }}
                              value={el.value}
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
                    <CLabel className="text-danger">*</CLabel>
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
                            <CInput
                              type="text"
                              id={`details${index}`}
                              name={`details${index}`}
                              placeholder={`${index + 1}.`}
                              autoComplete={`details${index}`}
                              onChange={(e) => {
                                this.inputProsCons(e, index, "detailsAdd");
                              }}
                              value={el.value}
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
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="uniqueSellingProposition">
                      Unique Selling Proposition
                      <CLabel className="text-danger">*</CLabel>
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
    saveImage: state.LoginAndNavigationReducer.saveImage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addResource,
      addImage,
      fetchOneResource,
      setImage,
      editResource,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddResource)
);
