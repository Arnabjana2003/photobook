import React from 'react'
import authSevice from '../appwrite/authService'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../store/authSlice'
import logoutIcon from "../assets/logout.svg";
function LogOutBtn() {

const navigate = useNavigate() 
const dispatch = useDispatch();

    const logOut = ()=>{
        authSevice.logout()
        .then(()=>{
          dispatch(logout())
          navigate("/login")
        })
    }

  return (
    <div className=' inline-block mx-2' onClick={logOut}>
      <img className='w-5' src={logoutIcon} />
      </div>
  )
}

export default LogOutBtn