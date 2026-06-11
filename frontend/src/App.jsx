import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UserRole } from "./Components/UserRole";
import "./App.css"
import { AdminLogin } from "./Components/Admin/AdminLogin";
import { TeacherLogin } from "./Components/Teacher/TeacherLogin";
import { TeacherDashboard } from "./Components/Teacher/TeacherDashboard";
import { AttendancePage } from "./Components/Teacher/AttendancePage";
import { AdminDashBoard } from "./Components/Admin/AdminDashBoard";
import { AddTeacher } from "./Components/Admin/AddTeacher";
import { AdminHome } from "./Components/Admin/AdminHome";
import { AddDepartment } from "./Components/Admin/AddDepartment";
import { ViewTeachers } from "./Components/Admin/ViewTeachers";

function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserRole/>}></Route>
      <Route path="/admin_login" element={<AdminLogin/>}/>
      <Route path="/teacher_login" element={<TeacherLogin/>}/>
      <Route path="/teacher_dashboard" element={<TeacherDashboard/>}/>
      <Route path="/attendance_page" element={<AttendancePage/>}/>
      <Route path="/admin_dashboard" element={<AdminDashBoard/>}>

        <Route path="" element={<AdminHome/>}/>
        <Route path="add_teacher" element={<AddTeacher/>}/>
        <Route path="add_department" element={<AddDepartment/>}/>
         <Route path="view_teachers" element={<ViewTeachers/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
