import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Student/Login";
import StudentLayout from "./pages/Student/StudentLayout";
import ResetPassword from "./pages/Student/ResetPassword";
import Confirmation from "./pages/Student/Confirmation";
import QRScanner from "./pages/Student/QRScanner";
import Attendence from "./pages/Student/Attendence";
import StudentProfile from "./pages/Student/Profile";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminAttendance from "./pages/Admin/AdminAttendance";
import Course from "./pages/Admin/Course";
import Students from "./pages/Admin/Students";
import ClassSchedule from "./pages/Admin/ClassSchedule";
import { Profile } from "./pages/Admin/Profile";
import { AddCourse } from "./pages/Admin/AddCourse";
import { AddModule } from "./pages/Admin/AddModule";
import { AddSchedule } from "./pages/Admin/AddSchedule";
import { Reports } from "./pages/Admin/Reports";
import { AddStudent } from "./pages/Admin/AddStudent";
import AdminLogin from "./pages/Admin/Login";
import NoLogin from "./pages/Student/NoLogin";
import GlobalLoader from "./lib/GlobalLoader";

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, redirectTo }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

// Simulated authentication check (replace with actual logic)
const isAdminAuthenticated = () => {
  console.log("localStorage.getItem(admin")
  console.log(localStorage.getItem("adminToken"))
  return !!localStorage.getItem("adminToken"); // Example logic for admin authentication
};

const isStudentAuthenticated = () => {
  console.log("localStorage.getItem(student")
  return !!localStorage.getItem("profile"); // Example logic for student authentication
};

export default function AppRouter() {
  return (
      <Router>
        <GlobalLoader />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/student/auth" element={<NoLogin />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAdminAuthenticated()} redirectTo="/admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/attendance" element={<AdminAttendance />} />
            <Route path="/admin/courses" element={<Course />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/classschedule" element={<ClassSchedule />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/add-course" element={<AddCourse />} />
            <Route path="/admin/add-module" element={<AddModule />} />
            <Route path="/admin/add-schedule" element={<AddSchedule />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/add-student" element={<AddStudent />} />
          </Route>

          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isStudentAuthenticated()} redirectTo="/student/auth" />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route path="qr-scanner" element={<QRScanner />} />
              <Route path="attendence" element={<Attendence />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
  );
}
