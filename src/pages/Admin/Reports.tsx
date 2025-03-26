import React, {useEffect, useState} from "react";
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
import {request} from "../../lib/apiManagerAdmin";
import {Select, SelectContent, SelectItem, SelectTrigger} from "../../components/ui/select";
import {motion} from "framer-motion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table";
import AppHeader from "../../components/appheader";




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

    const [page, setPage] = useState(1);
    const [counts, setCounts] = useState(null);
    const [subjectList, setSubjectList] =  useState<any | null>(null);
    const [selectedSubject, setSelectedSubject] =  useState<any | null>(null);
    const [courseList, setCourseList] = useState<any | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
    const [attendanceList, setAttendanceList] = useState<any | null>(null);


    const [searchTerm, setSearchTerm] = useState<string>("");
    const [date, setDate] = useState<string>("");


    useEffect(() => {
        getCourses();
        getSubjects();
    }, []);
    const getCourses = async () => {
        try {
            const response = await request({
                method: "get",
                path: "/courses",
                requestBody: {
                },
            });
            console.log(response);
            const data = response.data;
            console.log(data);
            setCourseList(data)

        } catch (error) {
            if (error instanceof Error) {
                alert("An error occurred. Please username or password and try again");
            }
        }
    };
    const getSubjects = async () => {
        try {
            const response = await request({
                method: "get",
                path: "/subjects",
                requestBody: {
                },
            });
            console.log(response);
            const data = response.data;
            console.log(data);
            setSubjectList(data)

        } catch (error) {
            if (error instanceof Error) {
                alert("An error occurred. Please username or password and try again");
            }
        }
    };

    const download = async () => {

        const response = await request({
            method: "post",
            path: "/attendance/filter/report",
            requestBody: {
                courseId: selectedCourse?.id,
                subjectId: selectedSubject?.id,
                value: searchTerm,
                date: date
            },
        });
        const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create a link element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance.csv'); // Set download filename
        document.body.appendChild(link);
        link.click(); // Trigger download
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="border border-[var(--primary-border-color)] rounded-lg shadow-md xs:rounded-none">
                    <AppHeader name={"Reports"} subName={""}/>
                    <div className="flex flex-1 flex-col gap-4 pt-0">

                        <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
                            <h2 className="text-2xl font-semibold text-left">Attendance Report Download</h2>

                            <div className="flex gap-4  flex-wrap">
                                <div>
                                    <h3 className="text-lg font-medium mb-2  text-left">Course Filter</h3>
                                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                        <SelectTrigger className="border border-[var(--primary-border-color)] rounded-lg p-3 elevation-1 hover:elevation-2 transition-all duration-300">
                                            {selectedCourse == null ? "Select Course" : selectedCourse.course_name}
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>All Courses</SelectItem>
                                            {courseList?.map(course => (
                                                <SelectItem key={course.id} value={course}>{course.course_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedCourse !== null && (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2 text-left">Module Filter</h3>
                                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                            <SelectTrigger className="border border-[var(--primary-border-color)] rounded-lg p-3 elevation-1 hover:elevation-2 transition-all duration-300">
                                                {selectedSubject === null ? "Select Module" : selectedSubject.subject_name}
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={null}>All Modules</SelectItem>
                                                {subjectList?.map((module) => (
                                                    <SelectItem key={module.id} value={module}>{module.subject_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div className="flex  flex-wrap">
                                    <h3 className="text-lg font-medium mb-2 text-left">Date</h3>
                                    <Input
                                        type="date"
                                        placeholder="Search by Course, Module, or Instructor"
                                        className="border border-[var(--primary-border-color)] rounded-lg elevation-1 hover:elevation-2 transition-all min-w-[150px] "
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex-0 min-w-[250px] w-full">
                                    <h3 className="text-lg font-medium mb-2 text-left">Search</h3>
                                    <Input
                                        type="text"
                                        placeholder="Search by Course, Module, or Instructor"
                                        className="border border-[var(--primary-border-color)] rounded-lg p-3 elevation-1 hover:elevation-2 transition-all duration-300 min-w-[200px] sm:min-w-100 w-full"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4  pt-3 flex-wrap">
                            <Button
                                onClick={download}
                                type="submit"
                                variant="accent"
                            >
                                Download
                            </Button>
                            </div>

                        </div>




                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
