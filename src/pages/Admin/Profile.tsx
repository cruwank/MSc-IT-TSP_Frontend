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




export function Profile() {

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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Name"
                                                        {...field}
                                                        className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2 "
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Email"
                                                        {...field}
                                                        className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Mobile Number"
                                                        {...field}
                                                        className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-medium mb-4">Change Password</h3>

                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="newPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="New Password"
                                                            {...field}
                                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Re Enter Password"
                                                            {...field}
                                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        variant="accent"
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </Form>

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

//
