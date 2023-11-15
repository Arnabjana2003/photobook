import React from "react";
import authSevice from "../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import logoutIcon from "../assets/logout.svg";

function LogOutBtn({ width = "w-5", text }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    authSevice.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <div className=" flex items-center mx-2" onClick={logOut}>
      <img className={`${width} mr-2`} src={logoutIcon} />
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default LogOutBtn;
