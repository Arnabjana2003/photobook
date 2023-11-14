import { useRef, useState } from "react";
import InputBox from "./InputBox";
import authSevice from "../appwrite/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Loading from "./Loading";

function SignUpForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const btnRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const signUp = async (email, pass, name) => {
    setLoading(true);
    setError("");
    btnRef.current.disabled = true;
    authSevice
      .signup(email, pass, name)
      .then((data) => {
        dispatch(login(data));
        navigate("/all-posts");
      })
      .catch((err) => setError(err))
      .finally(() => {
        emailRef.current.value = "";
        passRef.current.value = "";
        nameRef.current.value = "";
        setLoading(false);
        btnRef.current.disabled = false;
      });
  };

  if (loading) return <Loading label="Creating Account" />;
  else {
    return (
      <>
        <form className="w-full flex" onSubmit={(e) => e.preventDefault()}>
          <div className="w-4/5 md:w-2/5 lg:w-2/6 mx-auto my-3 bg-slate-200 p-5 rounded-md">
            <div className="flex flex-col items-center mb-5">
              <h2 className="text-center text-lg font-bold text-blue-700 mb-1">
                SignUp here
              </h2>
              <div className="text-center min-w-[50px] h-[3px] bg-blue-700 rounded-md"></div>
            </div>
            <InputBox
              ref={nameRef}
              lable="Your Full Name"
              placeholder="Enter your full name"
            />
            <InputBox
              ref={emailRef}
              lable="Email"
              placeholder="Enter your Email"
              type="email"
            />
            <InputBox
              ref={passRef}
              lable="Create new Password"
              placeholder="Password"
              type="password"
            />
            <div className="flex justify-center flex-col items-center">
              <button
                ref={btnRef}
                className=" disabled:bg-blue-300 bg-blue-700 text-white font-semibold py-1 px-3 rounded-md my-2"
                onClick={() =>
                  signUp(
                    emailRef.current.value,
                    passRef.current.value,
                    nameRef.current.value
                  )
                }
              >
                Create account
              </button>
              <p className=" text-red-700 font-medium text-sm">
                {error.message}
              </p>
              <p>
                Existing user?{" "}
                <Link to="/login" className="text-blue-800 font-semibold">
                  LogIn
                </Link>{" "}
              </p>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default SignUpForm;
