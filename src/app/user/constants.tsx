import {
  HomeIcon,
  UserPlus,
  Users,
  Edit,
  Trash2,
  Eye,
  HelpCircle,
  Globe,
} from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/user/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Manage Family Members",
    path: "/user/manage-family",
    icon: <Users width="24" height="24" />,
  },
  {
    title: "View Family",
    path: "/user/view-family",
    icon: <Eye width="24" height="24" />,
  },
  {
    title: "Community Families",
    path: "/user/community-families",
    icon: <Globe width="24" height="24" />,
  },
  {
    title: "Help",
    path: "", //  Path Romoved "/user/help"
    icon: <HelpCircle width="24" height="24" />,
  },
];
