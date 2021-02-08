import { Planners, Users, Experts, Resources } from "../containers/icons";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",

    icon: <Users customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Planners",
    to: "/planners",

    icon: <Planners customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Experts",
    to: "/experts",

    icon: <Experts customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Resources",
    to: "/resources",

    icon: <Resources customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
