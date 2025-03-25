import { useEffect, useState } from "react";
import ModuleSelector from "../../components/Student/ModuleSelector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { request } from "../../lib/apiManager";
import moment from "moment";

const Attendance = () => {
  const [selectedModule, setSelectedModule] = useState("ALL_MODULES");
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  console.log(attendanceRecords);

  console.log(selectedModule);

  const loadAttendance = async () => {
    try {
      const response = await request({
        method: "post",
        path: "/attendance/filter",
        requestBody: {
          studentId: profile.id,
          subjectId: selectedModule === "ALL_MODULES" ? null : selectedModule,
          courseId: null,
          value: "",
          page: page,
          limit: limit,
        },
      });
      console.log(response);
      setTotalPages(response.data.totalPages);
      setAttendanceRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, [selectedModule, page, limit]);

  const [moduleOptions, setModuleOptions] = useState<string[]>([]);

  const loadModules = async () => {
    try {
      const response = await request({
        method: "get",
        path: "/subjects",
      });
      console.log(response);
      // setModuleOptions(response);
      setModuleOptions(response?.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    loadModules();
  }, []);


  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4">
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700">E-Attendance</h2>
        <h2 className="text-lg font-semibold text-gray-700">Student Portal</h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Hi Student!
        </h1>

        <div className="w-full max-w-4xl p-1 bg-white rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Attendance Records
          </h2>

          <ModuleSelector
            modules={moduleOptions}
            selectedModule={selectedModule}
            onModuleChange={setSelectedModule}
          />

          <div className="w-full border rounded-xl overflow-hidden shadow-md bg-white pb-10">
            <div className="overflow-auto ">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-300">
                    <TableHead className="text-left p-2 text-blue-600 w-1/4">
                      Date
                    </TableHead>
                    <TableHead className="text-left p-2 text-blue-600 w-1/4">
                      Time
                    </TableHead>
                    <TableHead className="text-left p-2 text-blue-600 w-1/4">
                      Module
                    </TableHead>
                    <TableHead className="text-left p-2 text-blue-600 w-1/4">
                      Attendance
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record, index) => (
                      <TableRow key={index} className="border-b">
                        <TableCell className="p-1 w-1/4">
                          {record?.schedule?.class_date}
                        </TableCell>
                        <TableCell className="p-1 w-1/4">
                          {moment(record.schedule?.start_time, "HH:mm").format("hh:mm A") + " - " + moment(record.schedule?.end_time, "HH:mm").format("hh:mm A")}
                        </TableCell>
                        <TableCell className="p-1 w-1/4">
                          {record?.schedule?.subject?.subject_name}
                        </TableCell>
                        <TableCell className="p-2 w-1/4">
                          {record.status === "present" ? (
                            <span className="text-green-600 font-semibold">
                              Present
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Absent
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-gray-500 p-4"
                      >
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center  pl-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center space-x-4 py-2">
                <button
                  onClick={() => setPage((page) => page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded ${
                    page === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-700">
                  Page {totalPages === 0 ? 0 : page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((page) => page + 1)}
                  disabled={totalPages === page}
                  className={` mr-2 px-4 py-2 rounded ${
                    totalPages === page
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
