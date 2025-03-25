import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Button } from "../../components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../../components/ui/table";
import {request} from "../../lib/apiManagerAdmin";
import { AddClassScheduleModal } from "../../components/Modals/AddClassSchedule";

export default function AdminClassSchedule() {

  const baseUrl: string = import.meta.env.VITE_BASE_URL as string;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [classScheduleList, setClassScheduleList] = useState<any | null>(null);

  console.log("sheduuu list : ",classScheduleList);

  const [activeFilter, setActiveFilter] = React.useState<string>("courses");
  const [currentPage, setCurrentPage] = React.useState(1);
  const heightAdjustment = 300;

  const classScheduleData = [
    {
      courseName: "Artificial Intelligence",
      courseId: "AI101",
      module: "Deep Learning",
      moduleId: "DL201",
      qrCode: "https://placehold.co/150x150.png"
    }
  ];

  const rowsPerPage = Math.floor((window.innerHeight - heightAdjustment) / 50);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = classScheduleData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(classScheduleData.length / rowsPerPage);

  function handleFilterClick(filter: string): void {
    setActiveFilter(filter);
  }
  useEffect(() => {

    getClassSchedule();
  }, []);

  async function handleGenerateQR(id: number) {
    const response = await fetch(baseUrl + '/class-schedule/qr/view/' + id + '/300/2');
    // Set the download URL to the base64 string
    const blob = await response.blob();

    // Set the download attribute to suggest a file name
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "image.png"; // Default to 'image.png' if no file name is provided

    // Trigger the download
    link.click();
  }

  const getClassSchedule = async () => {
    try {
      const response = await request({
        method: "get",  // Changed from post to get
        path: "/class-schedule",  // Changed endpoint
      });
      const data = response.data;
      console.log("hhhhh : ",data);
      setClassScheduleList(data);
    } catch (error) {
      if (error instanceof Error) {
        alert("An error occurred. Please try again");
      }
    }
  };


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
                  <BreadcrumbPage>Class Schedule</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <span className="ml-auto font-medium text-gray-600">Hi! Admin</span>
          </header>

          <div className="flex flex-1 flex-col p-6">
            <h2 className="text-2xl font-semibold flex justify-between items-center">
              <span>PROGRAMS - CLASS SCHEDULE</span>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white"
              >
                Add Class Schedule
              </Button>
            </h2>

            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mt-4 text-left border border-[var(--primary-border-color)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Course ID</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Module ID</TableHead>
                      <TableHead>QR</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classScheduleList?.map((row, index) => (
                      <TableRow key={index} className="hover:bg-gray-100">
                        <TableCell>{row.subject.subject_name}</TableCell>
                        <TableCell>C0{row.id}</TableCell>
                        <TableCell>{row.subject.subject_name}</TableCell>
                        <TableCell>S0{row.subject.id}</TableCell>
                        <TableCell><img src={baseUrl+'/class-schedule/qr/view/'+row.id+'/150/2'} alt="QR Code" className="w-16 h-16" /></TableCell>
                        <TableCell>
                          {/*<Button variant="link" size="sm">View</Button> |*/}
                          <Button variant="link" size="sm" onClick={() => handleGenerateQR(row.id)}>
                            Download QR
                          </Button>
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

        {isAddModalOpen && (
          <AddClassScheduleModal 
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => {
              setIsAddModalOpen(false);
              getClassSchedule(); // Refresh the list
            }}
          />
        )}

      </SidebarInset>
    </SidebarProvider>

);
}