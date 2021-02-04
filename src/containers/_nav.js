import resources from "../assets/icons/resourcesIcon.svg";
import planners from "../assets/icons/plannerIcon.svg";
import experts from "../assets/icons/expertsIcon.svg";
import users from "../assets/icons/user1.svg";
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",

    icon: {
      src: users,
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

    icon: {
      src: experts,
    },
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
