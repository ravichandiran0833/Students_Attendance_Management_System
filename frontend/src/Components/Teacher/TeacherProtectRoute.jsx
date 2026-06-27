import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const TeacherProtectRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.teacher);

  return isAuthenticated ? children : <Navigate to="/teacher-login" />;
 
};

export default TeacherProtectRoute;
