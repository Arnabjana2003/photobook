import { forwardRef } from "react";

const MyInputBox = forwardRef(function InputBox(
  { lable, type = "text", placeholder = "Enter here" },
  ref
) {
  return (
    <>
      <div className=" mb-2 mx-auto">
        <label htmlFor={lable} className="font-semibold text-blue-800 text-sm">
          {lable}
        </label>
        <br />
        <input
          id={lable}
          type={type}
          placeholder={placeholder}
          className="border p-1 rounded-sm outline-none bg-white w-full"
          ref={ref}
        />
      </div>
    </>
  );
});
export default MyInputBox;
