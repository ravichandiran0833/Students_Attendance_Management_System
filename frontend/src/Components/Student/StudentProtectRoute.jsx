import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const StudentProtectRoute = ({children}) => {
    const {isAuthenticated} = useSelector((state)=>state.student)

    return isAuthenticated ?  children : <Navigate to="/student-login"/>
    
}

export default StudentProtectRoute