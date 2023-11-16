import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUSer()
      .then((userData) => {
        dispatch(login({ userData }));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, []);

  return (
    <div className=" font-serif">
      <div className="min-w-screen min-h-screen bg-slate-300">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
