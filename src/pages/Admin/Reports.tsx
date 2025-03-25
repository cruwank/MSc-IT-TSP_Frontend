import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Input } from "../../components/ui/input";


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Button } from "../../components/ui/button";




export function Reports() {

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Please enter a valid email.",
        }),
        mobile: z.string().min(10, {
            message: "Mobile number must be at least 10 characters.",
        }),
        newPassword: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        confirmPassword: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        })
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            newPassword: "",
            confirmPassword: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }



    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="border border-[var(--primary-border-color)] rounded-lg shadow-md xs:rounded-none">
                    <header className="flex h-16 shrink-0 items-center gap-2 shadow-md px-4 border-[var(--primary-border-color)] border-b">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4 bg-[var(--primary-border-color)]" />
                                <Breadcrumb>
                                  <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                      <BreadcrumbLink href="#">Programs</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                      <BreadcrumbPage>Course</BreadcrumbPage>
                                    </BreadcrumbItem>
                                  </BreadcrumbList>
                                </Breadcrumb>
                                <span className="ml-auto font-medium text-gray-600">Hi! Admin</span>
                              </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="flex flex-col gap-6 p-6">
                            <h2 className="text-xl font-semibold uppercase">PROFILE</h2>
                        </div>
                        {/* code goes hrer */}


                        <div className="flex space-x-[5%]">
                            <Input
                                disabled
                                placeholder="Reports"
                                className="border rounded-md p-2 w-1/2 border-[var(--primary-border-color)]"
                            />


                            <Button
                                type="submit"
                               variant="accent"
                            >
                                Download
                            </Button>
                        </div>




                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
