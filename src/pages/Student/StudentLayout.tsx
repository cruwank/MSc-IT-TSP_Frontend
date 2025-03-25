import { Outlet } from "react-router-dom";
import BottomNavBar from "../../components/Student/BottomNavBar"; 

const StudentLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet /> 
      </div>
      <BottomNavBar /> 
    </div>
  );
};

export default StudentLayout;
