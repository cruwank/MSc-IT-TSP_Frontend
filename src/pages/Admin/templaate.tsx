import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

export default function AdminAttendance() {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 shadow-md">
        <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>NAME</BreadcrumbPage>
                <BreadcrumbPage className="absolute right-5">Hi! admin</BreadcrumbPage>
                
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-col gap-6 p-6">
          <h2 className="text-xl font-semibold uppercase">NAME</h2>
        </div>
        {/* code goes hrer */}
      </div>
    </div>
    </SidebarInset>
    </SidebarProvider>
  );
}
