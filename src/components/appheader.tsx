import React, { useState } from 'react';
import {SidebarTrigger} from "./ui/sidebar";
import {Separator} from "./ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "./ui/breadcrumb";

const AppHeader = ({name,subName}) => {
    const adminDataString = localStorage.getItem("adminToken");
    const adminData = JSON.parse(adminDataString);
    const [isLogoutVisible, setLogoutVisible] = useState(false);

    const handleLogoutClick = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin'; // Redirect to login page
    };

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 shadow-md px-4 border-[var(--primary-border-color)] border-b">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-[var(--primary-border-color)]" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">{name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{subName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <span
                className="ml-auto font-medium text-gray-600 cursor-pointer"
                onClick={() => setLogoutVisible(!isLogoutVisible)}
            >
                Hi! {adminData.first_name}  {adminData.last_name}
            </span>

            {isLogoutVisible && (
                <button
                    onClick={handleLogoutClick}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Logout
                </button>
            )}
        </header>
    );
};

export default AppHeader;
