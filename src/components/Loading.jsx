import React from "react";

function Loading({ label = "Loading", textSize = "xl", bold = "semibold" }) {
  return (
    <div className="fixed right-0 left-0 w-full h-full z-30 opacity-70 flex items-center flex-col">
      <div className="mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-blue-700 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <div className=" mt-8 px-3">
        <p className={`font-${bold} text-slate-700 text-${textSize} `}>
          {label}.....
        </p>
      </div>
    </div>
  );
}

export default Loading;
