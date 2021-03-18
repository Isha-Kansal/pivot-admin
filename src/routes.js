import React from "react";

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const UserExpertUsage = React.lazy(() =>
  import("./views/users/UserExpertUsage")
);
const UserResourceUsage = React.lazy(() =>
  import("./views/users/UserResourceUsage")
);

const UserPlanner = React.lazy(() => import("./views/users/UserPlanner"));
const Resource = React.lazy(() => import("./views/resources/Resource"));
const Planner = React.lazy(() => import("./views/planner/Planner"));
const Experts = React.lazy(() => import("./views/experts/Experts"));
const Expert = React.lazy(() => import("./views/experts/Expert"));
const ExpertUserUsage = React.lazy(() =>
  import("./views/experts/ExpertUserUsage")
);
const AddExpert = React.lazy(() => import("./views/experts/AddExpert"));
const Resources = React.lazy(() => import("./views/resources/Resources"));
const AddResource = React.lazy(() => import("./views/resources/AddResource"));

const routes = [
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  {
    path: "/users/:id/expert-features",
    exact: true,
    name: "Expert Usage",
    component: UserExpertUsage,
  },
  {
    path: "/users/:id/resource-features",
    exact: true,
    name: "Resource Usage",
    component: UserResourceUsage,
  },
  { path: "/planner", exact: true, name: "Planner", component: Planner },

  {
    path: "/users/:id/planner-activity",
    exact: true,
    name: "Planner Activity",
    component: UserPlanner,
  },

  { path: "/experts", exact: true, name: "Experts", component: Experts },
  {
    path: "/experts/:id",
    exact: true,
    name: "Expert Details",
    component: Expert,
  },

  {
    path: "/experts/:id/calls-with-users",
    exact: true,
    name: "Calls with Users",
    component: ExpertUserUsage,
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
    path: "/editResource/:id",
    exact: true,
    name: "Edit Resource",
    component: AddResource,
  },
  {
    path: "/editExpert/:id",
    exact: true,
    name: "Edit Expert",
    component: AddExpert,
  },
];

export default routes;
