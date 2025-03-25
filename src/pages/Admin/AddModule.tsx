import React from "react";
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { Textarea } from "../../components/ui/textarea";

export function AddModule() {
    const form = useForm({
        defaultValues: {
            courseName: "",
            courseId: "",
            courseDescription: "",
            startDate: "",
            endDate: "",
            moduleName: "",
            moduleCode: "",
        },
    });

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="min-h-screen flex flex-col">
                    <header className="flex h-16 items-center gap-2 shadow-md px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">PROGRAMS</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>ADD COURSE</BreadcrumbPage>
                                    <BreadcrumbPage className="absolute right-5">Hi! admin</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>

                    <div className="flex flex-col gap-4 p-4 flex-1">
                        {/* <h2 className="text-xl font-semibold uppercase text-center">ADD COURSE</h2> */}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-[3%]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <FormField control={form.control} name="courseName" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Course Name" {...field} className="border rounded-md p-2 w-full" />
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="courseId" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Course ID" {...field} className="border rounded-md p-2 w-full" />
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="courseDescription" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Course Description" {...field} className="border rounded-md p-2 w-full" />
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField control={form.control} name="startDate" render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="date" {...field} className="border rounded-md p-2 w-[60%]" />
                                                    </FormControl>
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="endDate" render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="date" {...field} className="border rounded-md p-2 w-[60%] lg:ml-[40%]" />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                        </div>

                                        <div className="flex">
                                            <FormField control={form.control} name="moduleName" render={({ field }) => (
                                                <FormItem className="w-[60%]">
                                                    <FormControl>
                                                        <Input placeholder="Module Name" {...field} className="border rounded-md p-2  " />
                                                    </FormControl>
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="moduleCode" render={({ field }) => (
                                                <FormItem className="w-[20%]">
                                                    <FormControl>
                                                        <Input placeholder="Module Code" {...field} className="border rounded-md p-2 " />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                            <IoMdAdd className="text-4xl lg:ml-[3%] cursor-pointer " />
                                        </div>

                                        <div className="w-[49%]">
                                            <Textarea placeholder="Module Details" />

                                        </div>

                                        <Button type="submit" className="bg-black text-white border border-black rounded-md px-6 py-2 hover:bg-gray-800 w-full md:w-auto">
                                            Submit
                                        </Button>
                                    </div>

                                    <div className="space-y-4 md:pl-12 lg:pl-24 lg:max-w-xs lg:ml-[30%]">
                                        <div className="border rounded-md p-2 w-full text-center">
                                            <p className="text-gray-500">Created By User</p>
                                        </div>
                                        <div className="border rounded-md p-2 w-full text-center">
                                            <p className="text-gray-500">Created Date</p>
                                        </div>
                                        <div className="border rounded-md p-2 w-full text-center">
                                            <p className="text-gray-500">Last Edited User</p>
                                        </div>
                                        <div className="border rounded-md p-2 w-full text-center">
                                            <p className="text-gray-500">Last Edited Date</p>
                                        </div>
                                    </div>


                                </div>



                            </form>
                        </Form>


                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >
    );
}
