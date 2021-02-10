import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import resourcesData from "./ResourcesData";

const Resource = ({ match }) => {
  const resource = resourcesData.find(
    (resource) => resource.id.toString() === match.params.id
  );
  const resourcesDetails = resource
    ? Object.entries(resource)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Resource id: {match.params.id}</CCardHeader>
          <CCardBody>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Resource;
