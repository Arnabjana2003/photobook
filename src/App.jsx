import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import services from "./appwrite/services";
import { getUser } from "./store/userSlice";
import Loading from "./components/Loading"

function App() {
  const [loading,setLoading] = useState(true)
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
      services.getAllPhoto().then(data=>{
        dispatch(getUser(data.documents))
      }).finally(()=>{
        setLoading(false)
      })
  }, []);

 if(loading){
return <Loading/>
 }else{
  return (
    <div className=" font-serif">
      <div className="min-w-screen min-h-screen bg-slate-300">
        <Header />
        <Outlet />
      </div>
    </div>
  );
 }
}

export default App;
