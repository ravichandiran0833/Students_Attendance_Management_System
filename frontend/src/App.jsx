import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRole } from "./Components/UserRole";
import "./App.css";
import { AdminLogin } from "./Components/Admin/AdminLogin";
import { TeacherLogin } from "./Components/Teacher/TeacherLogin";
import { TeacherDashboard } from "./Components/Teacher/TeacherDashboard";
import { AttendancePage } from "./Components/Teacher/AttendancePage";
import { AdminDashBoard } from "./Components/Admin/AdminDashBoard";
import { AddTeacher } from "./Components/Admin/AddTeacher";
import { AdminHome } from "./Components/Admin/AdminHome";
import { AddDepartment } from "./Components/Admin/AddDepartment";
import { ViewTeachers } from "./Components/Admin/ViewTeachers";
import AdminProtectRoute from "./Components/Admin/AdminProtectRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<UserRole />}></Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/attendance-page" element={<AttendancePage />} />

          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectRoute>
                <AdminDashBoard />
              </AdminProtectRoute>
            }
          >
            <Route path="" element={<AdminHome />} />
            <Route path="add-teacher" element={<AddTeacher />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="view-teachers" element={<ViewTeachers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
