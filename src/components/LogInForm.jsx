import { useRef, useState } from "react";
import InputBox from "./InputBox";
import authSevice from "../appwrite/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Loading from "./Loading";

function LogInForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIn = async (email, pass) => {
    setLoading(true);
    setError("");
    btnRef.current.disabled = true;
    authSevice
      .login(email, pass)
      .then((data) => {
        dispatch(login(data));
        navigate("/all-posts");
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
        btnRef.current.disabled = false;
      });
  };

  if (loading) {
    return <Loading label="Logging In" />;
  } else {
    return (
      <>
        <form className=" w-full flex" onSubmit={(e) => e.preventDefault()}>
          <div className=" w-4/5 md:w-2/5 lg:w-2/6 mx-auto my-3 bg-slate-200 p-5 rounded-md">
            <div className="flex flex-col items-center mb-5">
              <h2 className="text-center text-lg font-bold text-blue-700 mb-1">
                LogIn here
              </h2>
              <div className="text-center min-w-[50px] h-[3px] bg-blue-700 rounded-md"></div>
            </div>

            <InputBox
              ref={emailRef}
              lable="Email"
              placeholder="Enter your Email"
              type="email"
            />
            <InputBox
              ref={passRef}
              lable="Enter your password"
              placeholder="Password"
              type="password"
            />

            <div className="flex justify-center flex-col items-center">
              <button
                ref={btnRef}
                className=" bg-blue-700 text-white font-semibold px-4 py-1 rounded-md my-2 disabled:bg-blue-300 hover:bg-blue-900 hover:scale-105"
                onClick={() =>
                  logIn(emailRef.current.value, passRef.current.value)
                }
              >
                LogIn
              </button>

              <p className=" text-red-700 font-medium text-sm">{error}</p>

              <p>
                New user?
                <Link to="/signup" className="text-blue-800 font-semibold">
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default LogInForm;
