import React from "react";
import { Link } from "react-router-dom";
import services from "../appwrite/services";
import userIcon from "../assets/user.svg";

function PostCard({ $id, title, featuredImage, username, time="2023-12-23" }) {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-full bg-gray-100 rounded-lg p-4">
        <div className="flex justify-between items-center">
        <div className="font-bold text-blue-600 md:text-lg flex items-center mb-2">
          <div className=" inline-block p-1 bg-white border-2 border-black rounded-full mr-1">
            <img src={userIcon} className=" w-3" />
          </div>
          {username}..
        </div>
          <p className="text-sm md:text-base">{time}</p>
        </div>
          <h2 className=" mt-2 text-base md:text-lg font-semibold">{title}</h2>
        <div className="w-full justify-center mb-4">
          <img
            src={services.previewFile(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
