import React from "react";
import { useParams, withRouter } from "react-router-dom";

const Search = (props) => {
  return (
    <>
      <form className="position-relative">
        <div className="text-center search-input">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            required
            //   onChange={handleSearch}
          />
        </div>
      </form>
    </>
  );
};

export default withRouter(Search);
