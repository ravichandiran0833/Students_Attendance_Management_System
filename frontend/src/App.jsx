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
import { ToastContainer } from "react-toastify";
import EditTeacher from "./Components/Admin/EditTeacher";
import ViewDepartments from "./Components/Admin/ViewDepartments";
import EditDepartment from "./Components/Admin/EditDepartment";
import TeacherProtectRoute from "./Components/Teacher/TeacherProtectRoute";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route index element={<UserRole />}></Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />

          {/* <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> */}
          <Route path="/attendance-page" element={<AttendancePage />} />

          <Route
          path="/teacher-dashboard"
          element={
            <TeacherProtectRoute>
              <TeacherDashboard></TeacherDashboard>
            </TeacherProtectRoute>
          }
          >

          </Route>

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
            <Route path="edit-teacher/:id" element={<EditTeacher />} />
            <Route path="view-departments" element={<ViewDepartments/>}/>
            <Route path="edit-department/:id" element={<EditDepartment/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
