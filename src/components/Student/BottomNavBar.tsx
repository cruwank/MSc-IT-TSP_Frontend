import { NavLink } from "react-router-dom";
import { Home, QrCode, User } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t shadow-md p-2 flex justify-around">
      <NavLink to="/student/attendence" 
      className={({ isActive }) => 
        `flex flex-col items-center transition-colors duration-300 ${
          isActive ? "text-blue-800" : "text-blue-500 hover:text-blue-600"
        }`
      }>
        <Home className="h-5 w-5" />
        <span className="text-xs ">Attendance</span>
      </NavLink>
      <NavLink to="/student/qr-scanner" 
      className={({ isActive }) => 
        `flex flex-col items-center transition-colors duration-300 ${
          isActive ? "text-blue-800" : "text-blue-500 hover:text-blue-600"
        }`
      }>
        <QrCode className="h-5 w-5" />
        <span className="text-xs">QR</span>
      </NavLink>
      <NavLink to="/student/profile" 
      className={({ isActive }) => 
        `flex flex-col items-center transition-colors duration-300 ${
          isActive ? "text-blue-800" : "text-blue-500 hover:text-blue-600"
        }`
      }>
        <User className="h-5 w-5" />
        <span className="text-xs">Profile</span>
      </NavLink>
    </div>
  );
}
