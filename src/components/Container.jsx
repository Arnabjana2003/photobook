import React from "react";

function Container({ children }) {
  return (
    <div className=" w-screen overflow-hidden flex justify-center">
      <div className=" md:max-w-screen-md w-fit">{children}</div>
    </div>
  );
}

export default Container;
