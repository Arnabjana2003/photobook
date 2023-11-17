import React from "react";
import userIcon from "../assets/user.jpg";

function UserIcon({img = userIcon}) {
  return (
    <>
      <div className=" w-8 h-8 inline-block bg-white border rounded-full mr-1 overflow-hidden ">
        <img src={img} alt="pic" className=" w-full h-full object-cover" />
      </div>
    </>
  );
}

export default UserIcon;
