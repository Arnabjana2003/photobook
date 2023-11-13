import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import services from "../appwrite/services";
import Loading from "./Loading";

function ViewPost() {
  const slug = useParams().slug;
  const [post, setPost] = useState();
  useEffect(() => {
    services.getPost(slug).then((data) => {
      setPost(data);
    });
  }, []);
  if (post) {
    return (
      <div className="w-screen h-screen md:h-auto py-8 flex justify-center p-1">
        <div className="md:max-w-[85%] max-h-[80%] flex justify-center">
          <div className="w-full md:w-3/5 ">
          <h4 className="font-semibold my-1">{post.username}</h4>
          <div className="border-4 flex justify-center items-center overflow-hidden">
            <img
              src={services.previewFile(post.featuredImage)}
              alt={post.title}
              className=" max-w-full max-h-full object-cover"
            />
          </div>
          <h1 className="my-2 text-xl font-bold">{post.title}</h1>
          <p>{post.content}</p>
          </div>
        </div>
      </div>
    );
  } else return <><Loading/></>
}

export default ViewPost;
