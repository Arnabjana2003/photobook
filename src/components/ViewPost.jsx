import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import services from "../appwrite/services";

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
      <div className="py-8 flex justify-center">
        <div className="max-w-[80%] max-h-[80%]">
          <h4 className="font-semibold my-1">{post.username}</h4>
          <div className=" bg-slate-500 flex items-center w-full overflow-hidden h-4/5">
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
    );
  } else return <h1>Loading Post View</h1>;
}

export default ViewPost;
