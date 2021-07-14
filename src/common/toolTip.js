import React, { useState } from "react";
import { Tooltip } from "reactstrap";

export default ({ placement = "left", target, children }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Tooltip
      placement={placement}
      isOpen={tooltipOpen}
      target={target}
      toggle={toggle}
    >
      {children}
    </Tooltip>
  );
};
