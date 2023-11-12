import React from 'react'
import authSevice from '../appwrite/authService'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../store/authSlice'


function LogOutBtn() {

  const dispatch = useDispatch()

const navigate = useNavigate()
    const logOut = ()=>{
        authSevice.logout()
        .then(()=>{
          dispatch(logout())
          navigate("/login")
        })
    }

  return (
    <button className=' bg-blue-700 px-1 text-sm md:p-2 md:text-base font-semibold text-white rounded-md my-2' onClick={logOut}>Log Out</button>
  )
}

export default LogOutBtn