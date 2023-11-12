import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Protecter({children,authentication = true}) {
    
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)
    const authStatus = useSelector(state=>state.authReducer.status)
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")}
        setLoading(false)
    }
    ,[authentication,navigate,authStatus])
  return loading?<h2>Loadinggg</h2>:<>{children}</>
}

export default Protecter