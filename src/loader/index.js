import React from "react";
const dots = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
export default () => (
  <>
    <div className="loader-backdrop" />
    <div className="content-loader">
      <div className="dot-loader">
        {dots.map(({}, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  </>
);
