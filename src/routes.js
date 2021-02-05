import React from "react";

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const Planners = React.lazy(() => import("./views/planners/Planners"));
const Experts = React.lazy(() => import("./views/experts/Experts"));
const AddExpert = React.lazy(() => import("./views/experts/AddExpert"));
const Resources = React.lazy(() => import("./views/resources/Resources"));
const AddResource = React.lazy(() => import("./views/resources/AddResource"));
const routes = [
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/planners", exact: true, name: "Planners", component: Planners },
  { path: "/experts", exact: true, name: "Experts", component: Experts },
  { path: "/addExpert", exact: true, name: "Add Expert", component: AddExpert },
  { path: "/resources", exact: true, name: "Resources", component: Resources },
  {
    path: "/addResource",
    exact: true,
    name: "Add Resource",
    component: AddResource,
  },
];

export default routes;
