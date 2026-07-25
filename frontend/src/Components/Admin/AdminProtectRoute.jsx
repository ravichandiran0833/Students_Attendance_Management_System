import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminProtectRoute = ({ children }) => {


  // const { adminInfo } = useSelector((state) => state.admin);
  // if(!adminInfo){
  //   return <Navigate to="/admin-login"/>
  // }
  // return children;

  const { isAuthenticated } = useSelector((state) => state.admin);

  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default AdminProtectRoute;
