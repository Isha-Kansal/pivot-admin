import React, { useState, useEffect, Fragment } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { fetchOneResource } from "../store/action";
import resourcesData from "./ResourcesData";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Avatar from "../../assets/icons/avatar.png";
const Resource = (props) => {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    const resource_id = props && props.match.params.id;
    dispatch(
      fetchOneResource(`resource/${resource_id}`, (value) => {
        console.log("89657890570950697", value);
        setResource(value.data.resource);
        setLoading(false);
      })
    );
  }, []);
  console.log("84967894897894897", props && props.saveImage);
  let category =
    resource &&
    resource.category &&
    resource.category.length > 0 &&
    resource.category.join(", ");

  let pros =
    resource &&
    resource.pros &&
    resource.pros.length > 0 &&
    resource.pros.join(", ");
  let cons =
    resource &&
    resource.cons &&
    resource.cons.length > 0 &&
    resource.cons.join(", ");
  let details =
    resource &&
    resource.info &&
    resource.info.length > 0 &&
    resource.info.join(", ");
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Resource Details</CCardHeader>

          <CCardBody>
            {resource && (
              <table className="table">
                <tbody>
                  <tr>
                    <td>RID</td>
                    <td>
                      <strong>{resource._id}</strong>
                    </td>
                  </tr>

                  {resource.title && (
                    <tr>
                      <td>Name</td>
                      <td>
                        <strong>{resource.title}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.profile_pic && (
                    <tr>
                      <td>Image</td>
                      <td>
                        <img src={resource.profile_pic} alt="profile" />
                      </td>
                    </tr>
                  )}
                  {resource.format && (
                    <tr>
                      <td>Format</td>
                      <td>
                        <strong>{resource.format}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.price && (
                    <tr>
                      <td>Price</td>
                      <td>
                        <strong>{resource.price}</strong>
                      </td>
                    </tr>
                  )}

                  {resource.category && (
                    <tr>
                      <td>Category</td>
                      <td>
                        <strong>{category}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.pace && (
                    <tr>
                      <td>Pace</td>
                      <td>
                        <strong>{resource.pace}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.website && (
                    <tr>
                      <td>Website Link</td>
                      <td>
                        <strong>{resource.website}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.unique_selling_proposition && (
                    <tr>
                      <td>Unique Selling Proposition</td>
                      <td>
                        <strong>{resource.unique_selling_proposition}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.pros && resource.pros.length > 0 && (
                    <tr>
                      <td>Pros</td>
                      <td>
                        <strong>{pros}</strong>
                      </td>
                      {/* {resource.pros.map((item, index) => {
                        return (
                          <td>
                            <strong>{`${index + 1}.  `}</strong>
                            <strong>{item}</strong>
                          </td>
                        );
                      })} */}
                    </tr>
                  )}
                  {resource.cons && resource.cons.length > 0 && (
                    <tr>
                      <td>Cons</td>
                      <td>
                        <strong>{cons}</strong>
                      </td>
                      {/* {resource.cons.map((item, index) => {
                        return (
                          <td>
                            <strong>{`${index + 1}.  `}</strong>
                            <strong>{item}</strong>
                          </td>
                        );
                      })} */}
                    </tr>
                  )}
                  {resource.info && (
                    <tr>
                      <td>Details</td>
                      <td>
                        <strong>{details}</strong>
                      </td>
                      {/* {resource.info.map((item, index) => {
                        return (
                          <td>
                            <strong>{`${index + 1}.  `}</strong>
                            <strong>{item}</strong>
                          </td>
                        );
                      })} */}
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => {
  return {
    saveImage: state.LoginAndNavigationReducer.saveImage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchOneResource,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Resource)
);
