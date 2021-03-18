import React from "react";
import { useParams, withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
const offsetLimit = 10;
const count = 15;
const PaginationCommon = (props) => {
  return (
    <>
      <div className="text-center pagination-input">
        {/* {count > offsetLimit && ( */}
        <Pagination
          className="mt-3 mx-auto w-fit-content"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="active"
          // activePage={page}
          itemsCountPerPage={offsetLimit}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          // onChange={pageChange}
        />
        {/* )} */}
      </div>
    </>
  );
};

export default withRouter(PaginationCommon);
