import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import resourcesData from "./ResourcesData";

const Resource = (props) => {
  const resource = resourcesData.find(
    (resource) => resource.id === props && props.match.params.id
  );

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
                      <strong>{resource.id}</strong>
                    </td>
                  </tr>

                  {resource.name && (
                    <tr>
                      <td>Name</td>
                      <td>
                        <strong>{resource.name}</strong>
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
                  {resource.pricing && (
                    <tr>
                      <td>Pricing</td>
                      <td>
                        <strong>{resource.pricing}</strong>
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
                  {resource.pros_and_cons && (
                    <tr>
                      <td>Pros & Cons</td>
                      <td>
                        <strong>{resource.pros_and_cons}</strong>
                      </td>
                    </tr>
                  )}
                  {resource.details && (
                    <tr>
                      <td>Details</td>
                      <td>
                        <strong>{resource.details}</strong>
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

export default Resource;
