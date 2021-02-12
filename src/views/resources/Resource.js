import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import resourcesData from "./ResourcesData";

const Resource = ({ match }) => {
  const resource = resourcesData.find(
    (resource) => resource.id.toString() === match.params.id
  );

  // const resourcesDetails = resource
  //   ? Object.entries(resource)
  //   : [
  //       [
  //         "id",
  //         <span>
  //           <CIcon className="text-muted" name="cui-icon-ban" /> Not found
  //         </span>,
  //       ],
  //     ];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          {/* <CCardHeader>Resource id: {match.params.id}</CCardHeader> */}
          <CCardHeader>Resource Details</CCardHeader>
          {/* <CCardBody>
            <table className="table">
              <tbody>
                {resourcesDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCardBody> */}
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
