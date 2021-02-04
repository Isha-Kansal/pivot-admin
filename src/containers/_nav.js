import resources from "../assets/icons/resourcesIcon.svg";
import planners from "../assets/icons/plannerIcon.svg";
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",

    icon: {
      src: resources,
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Planners",
    to: "/planners",

    icon: {
      src: planners,
    },
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

    icon: {
      src: resources,
    },
  },
];

export default _nav;
