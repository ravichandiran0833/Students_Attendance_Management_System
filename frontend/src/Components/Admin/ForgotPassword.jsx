import React, { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearOtpInfo, sendOtp, verifyOtp } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import Loading from "../../Components/Loading"
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpData, setOtpData] = useState("")

  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading, otpInfo, error,verifyOtpInfo } = useSelector((state) => state.admin);

  console.log("otpInfo:",otpInfo);
    console.log("verifyOtpInfo:",verifyOtpInfo);
  

  console.log("error:", error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email){
      dispatch(sendOtp({ email }));
    }

    if(email && otpData){
      dispatch(verifyOtp({email,otpData}))
    }
    
  };

  useEffect(() => {
    if (otpInfo?.success) {
      toast.success(otpInfo.message, {
        autoClose: 2000,
      });
      setShowOtpInput(true)
      dispatch(clearOtpInfo())
    }
    if (error) {
      toast.error(error?.message, {
        autoClose: 4000,
      });
      dispatch(clearError());
    }
    if(verifyOtpInfo?.success){
      toast.success(verifyOtpInfo?.message, {
        autoClose : 2000
      })
      
      navigate("/admin/change-password")
    }
  }, [otpInfo, error, dispatch,verifyOtpInfo, navigate]);

  return (
    <div className="relative w-full min-h-screen">
      {loading.sendOtp && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20">
          <Loading />
        </div>
      )}
      <div
        className={`admin-login-container h-screen w-screen lg:flex flex-col items-center md:pt-20 pt-10 transition-opacity duration-300  ${loading.sendOtp ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <div className="flex flex-col gap-6 lg:gap-10">
          <h1 className="text-center text-white text-2xl lg:text-4xl font-bold">
            Forgot Password
          </h1>
          <form className="admin-form w-70 h-auto  mx-auto md:w-90  lg:w-100  flex  items-center flex-col  gap-10 py-10 px-5 rounded-xl shadow-[0_0_20px_whitesmoke]">

            <div className="w-full  relative ">
              <MdOutlineEmail className="absolute mt-3 ml-3 text-white focus:text-white" />
              <input
                className="w-full border   outline-0 pl-10 py-2  mx-2 text-white rounded-lg focus:bg-black focus:border-2"
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            {showOtpInput && (
              <div className="w-full relative">
                <RiLockPasswordLine className="absolute mt-3 ml-3 text-white" />

                <input
                  className="w-full border outline-0 pl-10 py-2 mx-2 text-white rounded-lg focus:bg-black focus:border-2"
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  onChange={(e)=>setOtpData(e.target.value)}
                />
              </div>
            )}

            <div>
              <input
                className="text-md lg:text-xl text-white border rounded-xl px-6 py-2 cursor-pointer  mt-3 hover:bg-black outline-0"
                type="submit"
                value={showOtpInput?.success ? "Verify OTP" : "Send OTP"}
                disabled={loading.sendOtp}
                onClick={handleSubmit}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

// ${loading.adminLogin ? "opacity-50 pointer-events-none" : "opacity-100"}
