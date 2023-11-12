import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LogOutBtn from '../components/LogOutBtn';


function HomePage() {
  //const [loading,setLoading] = useState(true)
  
  return (
    <div className='flex justify-center'>
      {/* {!loading? <h1>Welcome</h1> : <h1>Loading</h1>} */}
        <p className=" text-xl md:text-4xl font-bold">Please Login to view all posts</p>
    </div>
  )
}

export default HomePage