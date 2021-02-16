import React from "react";

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const Resource = React.lazy(() => import("./views/resources/Resource"));
const Planners = React.lazy(() => import("./views/planners/Planners"));
const Experts = React.lazy(() => import("./views/experts/Experts"));
const Expert = React.lazy(() => import("./views/experts/Expert"));
const AddExpert = React.lazy(() => import("./views/experts/AddExpert"));
const Resources = React.lazy(() => import("./views/resources/Resources"));
const AddResource = React.lazy(() => import("./views/resources/AddResource"));
// const EditResource = React.lazy(() => import("./views/resources/EditResource"));
// const EditExpert = React.lazy(() => import("./views/resources/EditExpert"));
const routes = [
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/planners", exact: true, name: "Planners", component: Planners },
  { path: "/experts", exact: true, name: "Experts", component: Experts },
  {
    path: "/experts/:id",
    exact: true,
    name: "Expert Details",
    component: Expert,
  },
  { path: "/addExpert", exact: true, name: "Add Expert", component: AddExpert },
  { path: "/resources", exact: true, name: "Resources", component: Resources },
  {
    path: "/resources/:id",
    exact: true,
    name: "Resource Details",
    component: Resource,
  },
  {
    path: "/addResource",
    exact: true,
    name: "Add Resource",
    component: AddResource,
  },
  {
    path: "/editResource",
    exact: true,
    name: "Edit Resource",
    component: AddResource,
  },
  {
    path: "/editExpert",
    exact: true,
    name: "Edit Expert",
    component: AddExpert,
  },
];

export default routes;
