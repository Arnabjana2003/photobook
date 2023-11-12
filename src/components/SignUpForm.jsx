import { useRef, useState } from "react";
import InputBox from "./inputBox";
import authSevice from "../appwrite/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function SignUpForm() {
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passRef = useRef(null)
    const btnRef = useRef(null)
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signUp = async(email,pass,name)=>{
      setError("")
      btnRef.current.disabled = true;
      authSevice.signup(email,pass,name).then((data)=>
      {dispatch(login(data))
        navigate("/all-posts")
      })
      .catch(err=>setError(err))
      .finally(()=>btnRef.current.disabled = false);
    }
  return (
    <>
      <form className="w-full flex" onSubmit={e=>e.preventDefault()}>
      <div className="w-60 mx-auto my-3 bg-slate-200 p-5 rounded-md">
        <div className="flex flex-col items-center mb-5">
        <h2 className="text-center text-lg font-bold text-blue-700 mb-1">SignUp here</h2>
        <div className="text-center min-w-[50px] h-[3px] bg-blue-700 rounded-md"></div>
        </div>
      <InputBox ref={nameRef} lable="Your Full Name" placeholder="Enter your full name"/>
      <InputBox ref={emailRef} lable="Email" placeholder="Enter your Email" type="email"/>
      <InputBox ref={passRef} lable="Create new Password" placeholder="Password" type="password"/>
      <div className="flex justify-center flex-col items-center">
      <button ref={btnRef} className=" disabled:bg-blue-300 bg-blue-700 text-white font-semibold p-1 rounded-md px-2 my-2" onClick={()=>signUp(emailRef.current.value,passRef.current.value,nameRef.current.value)}>SignUp</button>
      <p className=" text-red-700 font-medium text-sm">{error.message}</p>
      <p>Existing user? <Link to="/login" className="text-blue-800 font-semibold">LogIn</Link> </p>
      </div>
      </div>
      
      </form>
    </>
  );
}

export default SignUpForm;
