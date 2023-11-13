import { useState, useEffect } from "react";
import "./App.css";
import { AddPostForm, AllPosts, Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";

import { Outlet, useNavigate } from "react-router-dom";
import Protecter from "./components/Protecter.jsx";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUSer()
      .then((userData) => {
        dispatch(login({ userData }))
        
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      })
      ;
  }, []);

  return (
    <>
      <div className="min-w-screen min-h-screen bg-slate-300">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
