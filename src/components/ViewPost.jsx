import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/services";
import authService from "../appwrite/authService";
import Loading from "./Loading";
import DeleteBtn from "./DeleteBtn";
import UserIcon from "./UserIcon";

function ViewPost() {
  const { slug, userId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [title, setTitle] = useState("jgkmjvfr");
  const [content, setContent] = useState("mjkcfk");
  const [isEditable, setIsEditable] = useState(false);
  const [modification, setModification] = useState(false);
  const [dots, setDots] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    services
      .getPost(String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), slug)
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        authService.getCurrentUSer().then((user) => {
          if (data.userId === user.$id) {
            setModification(true);
          }
        });
      });
  }, []);

  const onEdit = () => {
    services
      .updatePost(slug, title, content)
      .then(() => {
        navigate("/all-posts");
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setIsEditable(false);
      });
  };

  const onCancelEdit = () => {
    setTitle(post.title);
    setContent(post.content);
    setIsEditable(false);
    setDots(false);
  };

  if (post && !loading) {
    return (
      <div className="w-screen min-h-screen md:h-auto py-8 flex justify-center p-2">
        <div className="flex justify-center">
          <div className="w-full md:w-4/5">
            <div className="flex justify-between items-center">
              <Link to={`view-profile/${post.username}/${userId}`}
              className="flex items-center"
              >
              <UserIcon />
                <h4 className="font-semibold my-1 text-blue-600 ml-2">
                  {post.username}
                </h4>
              </Link>
              <div
                className={`${
                  modification ? "block" : "hidden"
                } relative text-2xl md:text-3xl text-blue-700 font-semibold pb-3 w-fit]`}
              >
                <span onClick={() => setDots((prev) => !prev)}>...</span>
                <div
                  className={` bg-slate-500 p-3 rounded-xl rounded-tr-none text-white text-sm font-normal absolute right-4 min-w-max ${
                    !dots ? "hidden" : null
                  }`}
                >
                  <ul>
                    <li className="m-1 px-3 py-1 block rounded-md hover:bg-blue-700">
                      <DeleteBtn
                        label="Delete Post"
                        className="text-white"
                        loadFunc={(load) => setLoading(load)}
                      />
                    </li>
                    <li
                      onClick={() => {
                        setIsEditable(true);
                        setDots((pre) => !pre);
                      }}
                      className="m-1 px-3 py-1 block rounded-md hover:bg-blue-700"
                    >
                      Edit Post
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <input
              type="text"
              value={title}
              className=" w-full bg-transparent outline-none font-sans text-base md:text-lg lg:text-xl font-bold mt-2"
              onChange={(e) => setTitle(e.target.value)}
              readOnly={!isEditable}
            />
            <textarea
              type="text"
              value={content}
              className=" w-full bg-transparent outline-none text-sm lg:text-base font-sans py-2"
              onChange={(e) => setContent(e.target.value)}
              readOnly={!isEditable}
            />
            {isEditable ? (
              <>
                <button
                  className=" bg-blue-700 text-white font-semibold px-4 py-1 rounded-md my-2 disabled:bg-blue-300 outline-none hover:bg-blue-900 hover:scale-105"
                  onClick={onEdit}
                >
                  Update post
                </button>
                <button
                  className=" bg-white text-black font-semibold px-4 py-1 rounded-md my-2 disabled:bg-blue-300 outline-none hover:bg-slate-200 ml-4 hover:scale-105"
                  onClick={onCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : null}
            <div className="border-4 flex justify-center items-center overflow-hidden">
              <Link to={`/${post.featuredImage}`}>
              <img
                src={services.previewFile(post.featuredImage)}
                alt={post.title}
                className=" w-full max-h-full object-cover"
              /></Link>
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
