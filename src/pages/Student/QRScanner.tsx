import { useEffect, useState } from "react";
import QRScannerComponent from "../../components/Student/QR";
import { request } from "../../lib/apiManager";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const [attendance, setAttendance] = useState(null);
  const navigate = useNavigate();

  console.log(scanResult);


  const markAttendance = async (value: string | null) => {
    try {
      if (typeof value === "string" && value.length > 3) {
        setScanResult(value);
        const response = await request({
          method: "post",
          path: "/attendance",
          requestBody: {
            studentId: profile.id,
            qrCode: value,
            remarks: "Attended on time",
          },
        });
        console.log(response);
        setAttendance(response.data);
        setScanResult(value);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (attendance) {
      timeout = setTimeout(() => {
        navigate('/student/attendence');
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [attendance]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4">
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700">E-Attendance</h2>
        <h2 className="text-lg font-semibold text-gray-700">Student Portal</h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Hi Student! 🎓
        </h1>
        {scanResult === null ? (
          <div className="w-[320px] h-[340px] bg-white rounded-2xl shadow-lg flex items-center justify-center p-4">
            <QRScannerComponent onScan={markAttendance} />
          </div>
        ) : (
          <div className="mt-6 p-4 w-[320px] bg-green-100 border border-green-500 text-green-700 rounded-lg shadow-md">
            <h2 className=" text-center text-xl mb-2">
              Attendance Marked Successfully
            </h2>
            <p className="text-center">
              Student: {attendance?.student.first_name}{" "}
              {attendance?.student.last_name}
              <br />
              Teacher:{" "}
              {attendance?.schedule?.subject?.teacher?.first_name +
                " " +
                attendance?.schedule?.subject?.teacher?.last_name}
              <br />
              Course: {attendance?.schedule?.subject?.subject_name} <br />
              Date :{" "}
              {moment(attendance?.schedule.class_date).format("DD-MM-YYYY")}
              <br />
              Time:{" "}
              {moment(attendance?.schedule.start_time, "HH:mm").format(
                "h:mm A"
              )}{" "}
              -{" "}
              {moment(attendance?.schedule.end_time, "HH:mm").format("h:mm A")}
            </p>

            <p className="text-center text-blue-600">
              Please wait... You will be redirected to the attendance page.
            </p>
          </div>
        )}

        {/* <button
          onClick={() => {
            markAttendance("M8MXUC3W-81MIJR");
          }}
        >
          markAttendance
        </button> */}
      </div>
    </div>
  );
};

export default QRScanner;
