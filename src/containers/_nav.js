const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",

    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Planners",
    to: "/planners",

    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Experts",
    to: "/experts",

    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Resources",
    to: "/resources",

    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Login",
        to: "/login",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register",
        to: "/register",
      },
    ],
  },
];

export default _nav;
