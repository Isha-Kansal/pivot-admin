import React from "react";

import Pagination from "react-js-pagination";

const PaginationCommon = (props) => {
  const { pageChange, count, offsetLimit, page, loading } = props;
  return (
    <>
      <div className="text-center pagination-input">
        {count > offsetLimit && !loading && (
          <Pagination
            className="mt-3 mx-auto w-fit-content"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="active"
            activePage={page}
            itemsCountPerPage={offsetLimit}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={pageChange}
          />
        )}
      </div>
    </>
  );
};

export default PaginationCommon;
