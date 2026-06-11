import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export const AdminLogin = () => {
  return (
    <div className='admin-login-container h-screen w-screen lg:flex flex-col items-center md:pt-20 pt-10'>
        <div className='flex flex-col gap-6 lg:gap-10'>
            <h1 className='text-center text-white text-2xl lg:text-4xl font-bold'>Welcome Back</h1>
            <form className="admin-form w-70 h-90 mx-auto md:w-90 md:h-100 lg:w-100 lg:h-100 flex  items-center flex-col  gap-10 py-10 px-5 rounded-xl shadow-[0_0_20px_whitesmoke]">
               <h1 className='text-xl lg:text-3xl text-white font-bold'>Login</h1>
                <div className='w-full  relative '>
                    <MdOutlineEmail className='absolute mt-3 ml-3 text-white'/>
                    <input 
                    className='w-full border   outline-0 pl-10 py-2  mx-2 text-white rounded-lg focus:bg-black focus:border-2'
                    type='email' 
                    placeholder='Email' 
                    ></input>
                </div>
                  <div className='w-full  relative '>
                    <RiLockPasswordLine className='absolute mt-3 ml-3 text-white'/>
                    <input 
                    className='w-full border  outline-0 pl-10 py-2 mx-2 text-white rounded-lg focus:bg-black focus:border-2'
                    type='text' 
                    placeholder='Password'></input>
                </div>
                <div className=''>
                    <input 
                    className='text-md lg:text-xl text-white border rounded-xl px-6 py-2 cursor-pointer  mt-3 hover:bg-black outline-0'
                    type='submit' 
                    value="Submit"></input>
                </div>
            </form>
        </div>
    </div>
  )
}
