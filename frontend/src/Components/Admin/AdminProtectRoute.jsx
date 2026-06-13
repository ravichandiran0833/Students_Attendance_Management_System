import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminProtectRoute = ({ children }) => {


  const { adminInfo } = useSelector((state) => state.admin);
  console.log("adminInfo:", adminInfo);

  if(!adminInfo){
    return <Navigate to="/admin-login"/>
  }

  return children;
};

export default AdminProtectRoute;
