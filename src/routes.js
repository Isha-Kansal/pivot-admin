import React from "react";

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const Planners = React.lazy(() => import("./views/planners/Planners"));
const Experts = React.lazy(() => import("./views/experts/Experts"));
const Resources = React.lazy(() => import("./views/resources/Resources"));

const routes = [
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/planners", exact: true, name: "Planners", component: Planners },
  { path: "/experts", exact: true, name: "Experts", component: Experts },
  { path: "/resources", exact: true, name: "Resources", component: Resources },
];

export default routes;
