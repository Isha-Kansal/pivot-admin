import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const Resources = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            Resources
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Resources;
