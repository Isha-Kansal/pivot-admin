import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import { fetchOneResource } from "../store/action";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import Loader from "../../loader";
const Resource = (props) => {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    const resource_id = props && props.match.params.id;
    dispatch(
      fetchOneResource(`resource?id=${resource_id}`, (value) => {
        setResource(value.data.resource);
        setLoading(false);
      })
    );
  }, []);

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
          {loading && <Loader />}
          <CCardHeader>Resource Details</CCardHeader>

          <CCardBody>
            {resource && (
              <table className="table">
                <tbody>
                  {!loading && (
                    <tr>
                      <td>RID</td>
                      <td>
                        <strong>{resource._id}</strong>
                      </td>
                    </tr>
                  )}

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
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "4px",
                          }}
                          src={resource.profile_pic}
                          alt="profile"
                        />
                      </td>
                    </tr>
                  )}
                  {resource.resource_format && (
                    <tr>
                      <td>Format</td>
                      <td>
                        <strong>{resource.resource_format}</strong>
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
                    </tr>
                  )}
                  {resource.cons && resource.cons.length > 0 && (
                    <tr>
                      <td>Cons</td>
                      <td>
                        <strong>{cons}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.info && (
                    <tr>
                      <td>Details</td>
                      <td>
                        <strong>{details}</strong>
                      </td>
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
