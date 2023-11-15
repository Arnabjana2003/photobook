import React from "react";
import userIcon from "../assets/user.svg";

function UserIcon() {
  return (
    <>
      <div className=" inline-block p-1 bg-white border-2 border-black rounded-full mr-1">
        <img src={userIcon} className=" w-3" />
      </div>
    </>
  );
}

export default UserIcon;
