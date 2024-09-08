import Home from "@/app/components/icons/home";
import Workflows from "@/app/components/icons/workflows";
import { MdTask } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import Settings from "@/app/components/icons/settings";
import Category from "@/app/components/icons/cateogary";
export const sidebarList = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/home",
  },
  {
    name: "Workflows",
    icon: Workflows,
    href: "/workflows",
  },
  {
    name: "Tasks",
    icon: MdTask,
    href: "/tasks",
  },
  {
    name: "Docs",
    icon: FiFileText,
    href: "/files",
  },

  {
    name: "Cateogary",
    icon: Category,
    href: "/cateogary",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];


export const tags=[
  {
    name: "tech",
  },
  {
    name: "design",
  },
  {
    name: "SaaS",
  },
  {
    name: "marketing",
  },
]