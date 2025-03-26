import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../../components/ui/table";
import { request } from "../../lib/apiManagerAdmin";
import CourseViewModal from "../../components/Modals/CourseView";
import CourseEditModal from "../../components/Modals/CourseEdit";
import AppHeader from "../../components/appheader";

const AdminCourse = () => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);

  const handleLogoutClick = () => {
    // Perform logout logic (clear session, redirect, etc.)
    console.log("User logged out");
    // Example: Redirect to login page or clear tokens
    localStorage.removeItem('adminToken');
    window.location.href = '/admin'; // Redirect to login page
  };

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseData, setCourseData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const heightAdjustment = 120;
  const rowsPerPage = Math.floor((window.innerHeight - heightAdjustment) / 50);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);


  const [allSubjects, setAllSubjects] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);


  const loadModules = async () => {
    try {
      const response = await request({
        method: "get",
        path: "/subjects",
      });
      console.log(response);
      // setModuleOptions(response);
      setAllSubjects(response?.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // Handle save
  const handleSave = async (updatedCourse) => {
    console.log("Updated Course Data:", updatedCourse);

    try {
      const response = await request({
        method: "put",
        path: "/courses/" + selectedCourse.id,
        requestBody: updatedCourse,
      });
      setEditModalOpen(false);
      // setModuleOptions(response);
      // setAllSubjects(response?.data);
      fetchCourses();
    } catch (error) {
      setEditModalOpen(false);
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    loadModules();
  }, []);
  useEffect(() => {
    fetchCourses();
  }, [searchTerm]);

  const fetchCourses = async () => {

    try {
      const response = await request({
        method: "post",
        path: "/courses/filter",
        requestBody: {
          value: searchTerm,
          page: 1,
          limit: 10,
        },
      });
      console.log(response);
      // setTotalPages(response.data.totalPages);
      setCourseData(response.data.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // useEffect(() => {
  //   const filtered = courseData.filter((item) =>
  //     (selectedCourse === "all" || item.course_name === selectedCourse) &&
  //     (selectedModule === "all" || item.module === selectedModule) &&
  //     (item.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  //   );
  //   setFilteredData(filtered);
  // }, [selectedCourse, selectedModule, searchTerm, courseData]);
  //
  // useEffect(() => {
  //   setModules(selectedCourse === "all" ? [] : data[selectedCourse] || []);
  //   if (selectedCourse === "all") {
  //     setSelectedModule("all");
  //     setSearchTerm("");
  //   }
  // }, [selectedCourse]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        {isModalOpen && (
            <CourseViewModal
                course={selectedCourse}
                onClose={() => setModalOpen(false)}
            />
        )}

        {isEditModalOpen && (
            <CourseEditModal
                course={selectedCourse}
                allSubjects={allSubjects}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSave}
            />
        )}

        <div className="border border-[var(--primary-border-color)] rounded-lg shadow-md xs:rounded-none xl:h-[calc(100vh-10px)] xl:overflow-hidden h-full">
         <AppHeader name={"Programs"} subName={"Course"}/>

          <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold text-left">Programs - Course</h2>
            <div className="flex gap-4 ">
              <div className="flex-0 min-w-[250px] w-full">
                <Input
                  type="text"
                  placeholder="Search by Course, Module, or Instructor"
                  className="border border-[var(--primary-border-color)] rounded-lg p-3 elevation-1 hover:elevation-2 transition-all duration-300 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mt-4 text-left border border-[var(--primary-border-color)]">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Module</TableHead>
                      {/*<TableHead>Class Date</TableHead>*/}
                      <TableHead>Duration</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>

                    {courseData?.map((row, index) => (
                      <TableRow key={index} className="hover:bg-gray-100">
                        <TableCell>{row.course_name}</TableCell>
                        <TableCell>{row.courseSubjects.map(cs => cs.subject.subject_name).join(", ")??"No Moudles"}</TableCell>
                        {/*<TableCell>{row.classDate}</TableCell>*/}
                        <TableCell>{row.duration}</TableCell>
                        <TableCell>
                          <Button onClick={()=>{
                            setSelectedCourse(row);
                            setModalOpen(true);
                          }} variant="link" size="sm">View</Button>
                          <span className="mx-1">|</span>
                          <Button onClick={()=>{
                            setSelectedCourse(row);
                            setEditModalOpen(true);
                          }} variant="link" size="sm">Edit</Button>
                          {/*<span className="mx-1">|</span>*/}
                          {/*<Button variant="link" size="sm">Add Module</Button>*/}
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </div>
            </motion.div>

            <div className="flex align-center justify-center gap-4 items-center mt-4">
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
};

export default AdminCourse;
