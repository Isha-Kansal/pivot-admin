import React, { useState, useEffect, Fragment } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { fetchOneResource } from "../store/action";
import resourcesData from "./ResourcesData";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
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
                  {resource.unique_selling_proposition && (
                    <tr>
                      <td>Unique Selling Proposition</td>
                      <td>
                        <strong>{resource.unique_selling_proposition}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.pros_cons && (
                    <tr>
                      <td>Pros & Cons</td>
                      <td>
                        <strong>{resource.pros_cons}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.info && (
                    <tr>
                      <td>Details</td>
                      <td>
                        <strong>{resource.info}</strong>
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
  return {};
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
