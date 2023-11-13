import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import authSevice from '../appwrite/authService';
import { login, logout } from "../store/authSlice";

function Protecter({children,authentication = true}) {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)
    const authStatus = useSelector(state=>state.authReducer.status)
    
    useEffect(()=>{
        authSevice
      .getCurrentUSer()
      .then((userData) => {
        dispatch(login({ userData }))
        
      })
      .catch((err) => {
        dispatch(logout());
      })

        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/all-posts")}
        setLoading(false)
    }
    ,[authentication,navigate,authStatus])
  return loading?<h2>Loadinggg</h2>:<>{children}</>
}

export default Protecter