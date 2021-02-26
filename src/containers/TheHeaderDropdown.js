import React from "react";
import { Button } from "reactstrap";

const TheHeaderDropdown = (props) => {
  const handleLogout = (e) => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    e.preventDefault();
    props.history.push("/login");
  };
  return (
    <div>
      <Button
        color="bordered"
        onClick={handleLogout}
        className="logout-btn ml-2"
      >
        Logout
      </Button>
    </div>
  );
};

export default TheHeaderDropdown;
