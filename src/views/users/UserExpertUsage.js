import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table } from "reactstrap";
const UserExpertUsage = (props) => {
  const { appointments } = props;
  const history = useHistory();

  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          <CCardHeader>List of Experts</CCardHeader>
          <CCardBody>
            <Table
              responsive
              className={`table ${
                appointments.length === 0 ? "tableHeight" : ""
              }`}
            >
              {appointments && appointments.length > 0 && (
                <thead>
                  <tr>
                    <th className="text-nowrap ">Id</th>

                    <th>Name</th>

                    <th>Date & Time</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {appointments && appointments.length === 0 && (
                  <h3 className="text-center no-user-found">
                    No Appointments Found!
                  </h3>
                )}
                {appointments &&
                  appointments.length > 0 &&
                  appointments.map((item, index) => {
                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/experts/${item.expert_id}`,
                            // state: usersDetails,
                          })
                        }
                      >
                        <td>{item.expert_id}</td>
                        <td>{/* {item.meeting.calendar} */}</td>

                        <td>{`${item.meeting.date} & ${item.meeting.time}`}</td>
                        <td>{item.appointment_status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default UserExpertUsage;
