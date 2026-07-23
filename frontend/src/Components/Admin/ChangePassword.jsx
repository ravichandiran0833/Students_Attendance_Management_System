import React, { useEffect, useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearError, clearResetPasswordInfo, clearVerifyOtpInfo, resetPassword } from '../../redux/slices/adminSlice';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {verifyOtpInfo,loading,error,resetPasswordInfo} = useSelector((state)=>state.admin)

  const email = verifyOtpInfo?.email || null


  useEffect(()=>{
    if(resetPasswordInfo?.success){
      toast.success(resetPasswordInfo?.message,{
        autoClose : 2000
      })
      dispatch(clearVerifyOtpInfo())
      dispatch(clearResetPasswordInfo())
      navigate("/admin-login")
    }
    if(error){
      toast.error(error.message,{
        autoClose : 2000
      })
      dispatch(clearError())
    }
  },[resetPasswordInfo, error, navigate,dispatch])

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(newPassword === confirmPassword){
      dispatch(resetPassword({email,newPassword}))
    }else{
      toast.warning("Password Does Not Match", {
        autoClose : 2000
      })
    }
  }

  return (
        <div className="relative w-full min-h-screen">
      {loading.resetPassword && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
          <Loading />
        </div>
      )}
      <div
        className={`admin-login-container h-screen w-screen lg:flex flex-col items-center md:pt-20 pt-10 transition-opacity duration-300 ${loading.resetPassword ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <div className="flex flex-col gap-6 lg:gap-10">
          <h1 className="text-center text-white text-2xl lg:text-4xl font-bold">
            Change Password
          </h1>
          <form className="admin-form w-70 h-auto  mx-auto md:w-90  lg:w-100  flex  items-center flex-col  gap-10 py-10 px-5 rounded-xl shadow-[0_0_20px_whitesmoke]">
            {/* <h1 className="text-xl lg:text-3xl text-white font-bold">Login</h1> */}
            {/* {error && (
              <p className="text-red-600 bg-white p-1 rounded text-xs md:text-lg">
                {error.message}
              </p>
            )} */}
            <div className="w-full  relative ">
              <label className='text-white ml-5'>Enter New Password</label>
             <RiLockPasswordLine className="absolute mt-3 ml-3 text-white" />
              <input
                className="w-full border   outline-0 pl-10 py-2  mx-2 text-white rounded-lg focus:bg-black focus:border-2"
                type="text"
                placeholder="New Password"
                name="newPassword"
                onChange={(e)=>setNewPassword(e.target.value)}
              ></input>
            </div>
            <div className="w-full  relative ">
              <label className='text-white ml-5'>Confirm Password</label>
              <RiLockPasswordLine className="absolute mt-3 ml-3 text-white" />
              <input
                className="w-full border  outline-0 pl-10 py-2 mx-2 text-white rounded-lg focus:bg-black focus:border-2"
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e)=>setConfirmPassword(e.target.value)}
              ></input>
              
            </div>
            <div className="">
              <input
                className="text-md lg:text-xl text-white border rounded-xl px-6 py-2 cursor-pointer  mt-3 hover:bg-black outline-0"
                type="submit"
                value="Submit"
                disabled={loading.resetPassword}
                onClick={handleSubmit}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword


