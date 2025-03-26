import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PersonStanding,
  PieChart,
  School,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import logo from "../assets/logo.png"

export const UserContext = React.createContext(null);


const data = {
  user: {
    name: "Admin",
    email: "admin@e-attendance.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Attendance",
      url: "/admin/attendance",
      icon: School,
    },
    {
      title: "Program",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Courses/Modules",
          url: "/admin/courses",
        },
        {
          title: "Class Schedule",
          url: "/admin/classschedule",
        },
      ],
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: PersonStanding,
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: PieChart,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: Bot,
    },
  ],
  navSecondary: [
    // {
    //   title: "Support",
    //   url: "/admin/support",
    //   icon: LifeBuoy,
    // },
    // {
    //   title: "Feedback",
    //   url: "/admin/feedback",
    //   icon: Send,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="w-[300px] flex items-center gap-2">
                <div className=" w-[300px]  text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={logo} alt="Sidebar Icon" />
                </div>
                {/*<div className="grid flex-1 text-left text-sm leading-tight">*/}
                {/*  /!*<span className="truncate font-medium">E-Attendance</span>*!/*/}
                {/*  /!* <span className="truncate text-xs">Enterprise</span> *!/*/}
                {/*</div>*/}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
