import React from "react";
import { CNavItem, CNavLink, CNav } from "@coreui/react";
import { withRouter } from "react-router-dom";
const Tabs = (props) => {
  const onClickAccount = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}`);
  };

  const onClickExpert = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}/expert-features`);
  };
  const onClickResource = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}/resource-features`);
  };

  const onClickPlanner = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}/planner-activity`);
  };
  return (
    <>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink onClick={onClickAccount}>Account Details</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={onClickPlanner}>Planner Activity</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={onClickExpert}>Usage of expert features</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={onClickResource}>
            Usage of resource features
          </CNavLink>
        </CNavItem>
      </CNav>
    </>
  );
};

export default withRouter(Tabs);
