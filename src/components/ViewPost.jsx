import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import services from "../appwrite/services";
import authService from "../appwrite/authService";
import Loading from "./Loading";
import DeleteBtn from "./DeleteBtn";

function ViewPost() {
  const slug = useParams().slug;
  const [post, setPost] = useState();
  const [modification, setModification] = useState(false);
  const [dots, setDots] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    services.getPost(slug).then((data) => {
      console.log(data);
      setPost(data);
      authService.getCurrentUSer().then((user) => {
        if (data.userId === user.$id) {
          setModification(true);
        }
      });
    });
  }, []);
  if (post && !loading) {
    return (
      <div className="w-screen min-h-screen md:h-auto py-8 flex justify-center p-2">
        <div className="flex justify-center">
          <div className="w-full md:w-4/5">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold my-1 text-blue-600">
                {post.username}
              </h4>
              <div
                className={`${
                  modification ? "block" : "hidden"
                } relative text-2xl md:text-3xl text-blue-700 font-semibold pb-3 w-fit]`}
              >
                <span onClick={() => setDots((prev) => !prev)}>...</span>
                <div
                  className={` bg-slate-500 p-3 rounded-xl rounded-tr-none text-white text-sm font-normal absolute right-1 min-w-max ${
                    !dots ? "hidden" : null
                  }`}
                >
                  <ul>
                    <li>
                      <DeleteBtn
                        label="Delete Post"
                        className="text-white"
                        loadFunc={(load) => setLoading(load)}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h1 className=" font-sans text-base md:text-lg lg:text-xl font-bold">
              {post.title}
            </h1>
            <p className=" text-sm lg:text-base font-sans py-2">
              {post.content}
            </p>
            <div className="border-4 flex justify-center items-center overflow-hidden">
              <img
                src={services.previewFile(post.featuredImage)}
                alt={post.title}
                className=" w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <>
        <Loading label="Deleting Post" />
      </>
    );
  } else return <Loading label="Laoding Image view" />;
}

export default ViewPost;
