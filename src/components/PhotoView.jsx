import React from "react";
import { useParams } from "react-router-dom";
import services from "../appwrite/services";

function PhotoView() {
  const { imgid } = useParams();
  return (
    <div className=" w-fit">
      <img src={services.previewFile(imgid)} className="w-full object-cover" />
    </div>
  );
}

export default PhotoView;
