import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CDataTable,
  CPagination,
} from "@coreui/react";
import resourcesData from "./ResourcesData";
import EDIT from "../../assets/icons/edit.svg";
import DELETE from "../../assets/icons/delete.svg";
const Resources = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/resources?page=${newPage}`);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const addResource = () => {
    props.history.push("/addResource");
  };
  const editResource = () => {
    props.history.push("/editResource");
  };
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <CButton
              style={{ width: 150 }}
              block
              color="info"
              onClick={addResource}
            >
              Add Resource
            </CButton>{" "}
          </CCardHeader>
          <CCardBody>
            <CCardBody>
              <CDataTable
                items={resourcesData}
                fields={[
                  { key: "name", _classes: "font-weight-bold" },
                  "format",
                  "pricing",
                  "unique selling proposition",
                  "pros & cons",
                  "details",
                  "action",
                ]}
                scopedSlots={{
                  action: (item) => (
                    <td>
                      <button className="icon" onClick={editResource}>
                        <img src={EDIT} className="ml-3" />
                      </button>
                      <button
                        className="icon"
                        // onClick={(e) => this.handlePlusButton(e, "prosAdd")}
                      >
                        <img src={DELETE} className="ml-3" />
                      </button>
                    </td>
                  ),
                }}
                itemsPerPage={10}
                activePage={page}
                clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={5}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withRouter(Resources);
