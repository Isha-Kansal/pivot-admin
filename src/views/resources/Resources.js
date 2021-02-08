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
} from "@coreui/react";

const Resources = (props) => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const addResource = () => {
    props.history.push("/addResource");
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
                // items={}
                fields={[
                  { key: "name", _classes: "font-weight-bold" },
                  "format",
                  "pricing",
                  "unique selling proposition",
                  "pros & cons",
                  "details",
                ]}
                itemsPerPage={10}
                activePage={page}
                clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}`)}
              />
            </CCardBody>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withRouter(Resources);
