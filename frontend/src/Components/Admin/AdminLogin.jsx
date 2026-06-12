import React, { useEffect, useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin } from '../../redux/slices/adminSlice';
import { useNavigate } from "react-router-dom"

export const AdminLogin = () => {

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const {adminInfo, error} = useSelector((state)=>state.admin)

    if(error){
      console.log("error:",error);
      
    }

    const [adminData, setAdminData] = useState({
        email : "",
        password : "",
        role : "admin"
    })

    const handleChange = (e)=>{
      const {name, value} = e.target;
      setAdminData((preData)=>({
        ...preData,
        [name] : value
      }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("admin data :",adminData);
        dispatch(fetchAdmin(adminData))    
    }

    useEffect(()=>{
      if(adminInfo?.success == true){
        navigate("/admin_dashboard")
      }
    },[adminInfo])

  return (
    <div className='admin-login-container h-screen w-screen lg:flex flex-col items-center md:pt-20 pt-10'>
        <div className='flex flex-col gap-6 lg:gap-10'>
            <h1 className='text-center text-white text-2xl lg:text-4xl font-bold'>Welcome Back</h1>
            <form className="admin-form w-70 h-auto  mx-auto md:w-90  lg:w-100  flex  items-center flex-col  gap-10 py-10 px-5 rounded-xl shadow-[0_0_20px_whitesmoke]">
               <h1 className='text-xl lg:text-3xl text-white font-bold'>Login</h1>
               {
                error && <p className='text-red-600 bg-white p-1 rounded text-xs md:text-lg'>{error.message}</p>
               }
                <div className='w-full  relative '>
                    <MdOutlineEmail className='absolute mt-3 ml-3 text-white focus:text-white'/>
                    <input 
                    className='w-full border   outline-0 pl-10 py-2  mx-2 text-white rounded-lg focus:bg-black focus:border-2'
                    type='email' 
                    placeholder='Email'
                    name='email'
                    value={adminData.email}
                    onChange={handleChange}
                    ></input>
                </div>
                  <div className='w-full  relative '>
                    <RiLockPasswordLine className='absolute mt-3 ml-3 text-white'/>
                    <input 
                    className='w-full border  outline-0 pl-10 py-2 mx-2 text-white rounded-lg focus:bg-black focus:border-2'
                    type='text' 
                    placeholder='Password'
                    name='password'
                    value={adminData.password}
                    onChange={handleChange}
                    
                    ></input>
                </div>
                <div className=''>
                    <input 
                    className='text-md lg:text-xl text-white border rounded-xl px-6 py-2 cursor-pointer  mt-3 hover:bg-black outline-0'
                    type='submit' 
                    value="Submit"
                    onClick={handleSubmit}
                    ></input>
                </div>
            </form>
        </div>
    </div>
  )
}
