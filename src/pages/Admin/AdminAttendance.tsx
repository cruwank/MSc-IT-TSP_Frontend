import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../../components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import {request} from "../../lib/apiManagerAdmin";

// Dummy Data for API Simulation
const data = {
    "Artificial Intelligence": ["Deep Learning", "Neural Networks", "AI Ethics"],
    "Data Science": ["Machine Learning", "Data Analytics", "Big Data"],
    "Cyber Security": ["Cryptography", "Cloud Security", "Ethical Hacking"],
    "Quantum Computing": ["Quantum Algorithms", "Quantum Cryptography"],
    "Robotics": ["Embedded Systems", "Automation"],
    "Biochemistry": ["Bioinformatics", "Genetic Engineering"],
    "Network Engineering": ["Network Security", "Wireless Communications"],
    "IoT Systems": ["Smart Devices", "Edge Computing"],
    "Software Engineering": ["Agile Development", "Software Testing"]
};

const attendanceData = Array.from({ length: 30 }, (_, i) => ({
    course: i % 3 === 0 ? "Artificial Intelligence" : i % 3 === 1 ? "Data Science" : "Cyber Security",
    module: i % 3 === 0 ? "Deep Learning" : i % 3 === 1 ? "Machine Learning" : "Cloud Security",
    instructor: `Instructor ${i + 1}`,
    attendanceDate: `2025-04-${String(1 + (i % 30)).padStart(2, '0')}`,
    totalStudents: Math.floor(Math.random() * 50) + 1, // Example random student count
}));

export default function AdminAttendance() {

    const [page, setPage] = useState(1);
    const [counts, setCounts] = useState(null);
    const [subjectList, setSubjectList] =  useState<any | null>(null);
    const [selectedSubject, setSelectedSubject] =  useState<any | null>(null);
    const [courseList, setCourseList] = useState<any | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
    const [attendanceList, setAttendanceList] = useState<any | null>(null);
    const [filteredData, setFilteredData] = useState(attendanceData);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const heightAdjustment = -50;
    const rowsPerPage = Math.floor((window.innerHeight - heightAdjustment) / 50);
    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    useEffect(() => {
        // let filtered = attendanceData.filter((item) =>
        //     (selectedCourse === "all" || item.course === selectedCourse) &&
        //     (selectedModule === "all" || item.module === selectedModule) &&
        //     (item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //         item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //         item.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
        // );
        // setFilteredData(filtered);
        getAttendance();
    }, [selectedCourse, selectedSubject, searchTerm]);

    // useEffect(() => {
    //     setModules(selectedCourse === "all" ? allModules : data[selectedCourse] || []);
    // }, [selectedCourse]);
    useEffect(() => {
        getCourses();
        getSubjects();
        getAttendance();
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
    const getAttendance = async () => {
        try {
            const response = await request({
                method: "post",
                path: "/attendance/filter",
                requestBody: {
                    courseId: selectedCourse?.id,
                    subjectId: selectedSubject?.id,
                    value: searchTerm,
                    page: page,
                    limit: 10
                },
            });
            console.log(response);
            const data = response.data;
            console.log(data);
            setAttendanceList(data.data)

        } catch (error) {
            if (error instanceof Error) {
                alert("An error occurred. Please username or password and try again");
            }
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            <div className="border border-[var(--primary-border-color)] rounded-lg shadow-md xs:rounded-none xl:h-[calc(100vh-10px)] xl:overflow-hidden h-full">
            <header className="flex h-16 shrink-0 items-center gap-2 shadow-md px-4 border-[var(--primary-border-color)] border-b">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-[var(--primary-border-color)]" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Attendance Management</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <span className="ml-auto font-medium text-gray-600">Hi! Admin</span>
                    </header>

                    <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
                        <h2 className="text-2xl font-semibold uppercase  text-left">Attendance Management</h2>

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

                        <motion.div
                            key={currentPage} // Ensures animation runs on page change
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="overflow-x-auto bg-white shadow-md rounded-lg  p-4 text-left border border-[var(--primary-border-color)]">
                                <Table className=" border-collapse w-full">
                                    <TableHeader className="color-[var(--primary-border-color)]">
                                        <TableRow>
                                            <TableHead>Course</TableHead>
                                            <TableHead>Module</TableHead>
                                            <TableHead>Attendance Date</TableHead>
                                            <TableHead>Instructor</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendanceList?.map((row, index) => (
                                            <TableRow key={index} className="hover:bg-gray-100">
                                                <TableCell>{row.schedule?.batch?.course.course_name}</TableCell>
                                                <TableCell>{row.schedule.subject.subject_name}</TableCell>
                                                <TableCell>{row.created_datetime.split('T')[0]}</TableCell>
                                                <TableCell>{row.schedule.subject.teacher.first_name} {row.schedule.subject.teacher.last_name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </motion.div>

                        <div className="flex align-center justify-center gap-4 items-center ">
                            <button
                                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-[var(--accent)] text-secondary rounded-lg"
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-[var(--accent)] text-secondary rounded-lg"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
