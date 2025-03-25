import React, { useState } from "react";
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

export function AddStudent() {
    const form = useForm({
        defaultValues: {
            courseName: "",
            courseId: "",
            courseDescription: "",
            startDate: "",
            endDate: "",
            moduleName: "",
            moduleCode: "",
            date: "",
            fromTime: "",
            toTime: "",
            classSchedule: "",
            studentName: "", // Added field
            studentId: "",   // Added field
            mobileNumber: "", // Added field
            email: "",        // Added field
        },
    });

    function onSubmit(values: any) {
        console.log(values);
    }

    const [courseName, setCourseName] = useState("");
    const [courses, setCourses] = useState<string[]>([]);

    const handleAddCourse = () => {
        if (courseName.trim() !== "") {
            setCourses([...courses, courseName]);
            setCourseName(""); // Clear input after adding
        }
    };

    const handleRemoveCourse = (index: number) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

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
                                        <FormField control={form.control} name="studentName" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Student Name" {...field} className="border rounded-md p-2 w-full" />
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="studentId" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Student ID" {...field} className="border rounded-md p-2 w-full" />
                                                </FormControl>
                                            </FormItem>
                                        )} />



                                        <div className="flex space-x-[5%] w-full">
                                            <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                                                <FormItem className="w-[50%]">
                                                    <FormControl>
                                                        <Input placeholder="Mobile Number" {...field} className="border rounded-md p-2  " />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem className="w-[50%]">
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} className="border rounded-md p-2 " />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                            {/* <IoMdAdd className="text-4xl lg:ml-[3%] cursor-pointer " /> */}
                                        </div>

                                        {/* <div className="flex">
                                            <FormField control={form.control} name="course" render={({ field }) => (
                                                <FormItem className="w-[70%]">
                                                    <FormControl>
                                                        <Input placeholder="Course" {...field} className="border rounded-md p-2 w-full" />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                            <IoMdAdd className="text-4xl lg:ml-[8%] cursor-pointer " />
                                        </div> */}

                                        {/* here */}
                                        <div className="flex items-center mb-4">
                                            <input
                                                type="text"
                                                value={courseName}
                                                onChange={(e) => setCourseName(e.target.value)}
                                                placeholder="Course"
                                                className="border rounded-md p-2 w-[70%]"
                                            />
                                            <IoMdAdd
                                                className="text-4xl ml-4 cursor-pointer lg:ml-[15%]"
                                                onClick={handleAddCourse}
                                            />
                                        </div>

                                        {/* Course List */}
                                        <div className="border p-3 rounded-md">
                                            {courses.length === 0 ? (
                                                <p className="text-gray-500">No courses added</p>
                                            ) : (
                                                courses.map((course, index) => (
                                                    <div key={index} className="flex justify-between items-center mb-2">
                                                        <span>{course}</span>
                                                        <button
                                                            className="text-red-500 hover:text-red-700 text-sm"
                                                            onClick={() => handleRemoveCourse(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        
                                        <Button type="submit" className="bg-black text-white border border-black rounded-md px-6 py-2 hover:bg-gray-800 lg:w-[20%] md:w-auto">
                                        Submit
                                    </Button>

                                        {/* here */}

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
        </SidebarProvider>
    );
}


//
