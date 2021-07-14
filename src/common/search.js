import React from "react";

const Search = (props) => {
  const { handleSearch } = props;
  return (
    <>
      <form className="position-relative">
        <div className="text-center search-input">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            required
            onChange={handleSearch}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
