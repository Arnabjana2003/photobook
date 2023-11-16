import React, { useEffect, useRef, useState } from "react";
import services from "../appwrite/services";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function AddPostForm() {
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();
  const [titles, setTitles] = useState("");
  const [slugs, setSlugs] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authReducer.userData);

  const handleClick = async (event) => {
    const title = event.title.value;
    const link = event.slug.value;
    const slug = String(link).concat(
      String(Math.floor(Math.random() * 100000000000000))
    );
    const content = event.content.value;
    const imgFile = event.uploadImg.files[0];

    if (title && slug && content && imgFile) {
      setLoading(true);
      btnRef.current.disabled = true;
      services
        .uploadFile(imgFile)
        .then((imgData) => {
          const featuredImage = imgData.$id;
          const userId = currentUser.$id;
          const username = currentUser.name;
          services
            .createPost(
              title,
              slug,
              content,
              featuredImage,
              "active",
              userId,
              username
            )
            .then(() => {
              btnRef.current.disabled = false;
              navigate("/all-posts");
            });
        })
        .catch((err) => {
          console.log(err);
          alert("Error");
          btnRef.current.disabled = false;
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Enter all the feilds");
    }
  };

  useEffect(() => {
    const slugVal = titles
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
    setSlugs(slugVal);
  }, [titles]);

  if (loading) {
    return (
      <Loading
        label="Uploading new Post. Don't refresh the page. It may take time to upload image"
        textSize="sm"
        bold="normal"
      />
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-centerr mt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick(e.target);
          }}
          className=" w-4/5 md:w-2/5 lg:w-2/6 border-double p-3 border-4 border-blue-600 rounded-md bg-blue-100"
        >
          <div className="my-3">
            <h4 className=" text-center text-blue-500 font-sans font-semibold md:font-bold text-lg mb-3 underline underline-offset-4 decoration-blue-700">
              Add new post
            </h4>
            <label htmlFor="title">Title</label>
            <br />
            <input
              name="title"
              type="text"
              placeholder="post name"
              id="title"
              className="outline-none border p-1 w-full rounded-md"
              value={titles}
              onChange={(e) => {
                setTitles(String(e.target.value));
              }}
            />
          </div>
          <div className="my-3">
            <label htmlFor="slug">Slug</label>
            <br />
            <input
              name="slug"
              readOnly
              type="text"
              id="slug"
              className="outline-none border p-1 w-full rounded-md"
              value={slugs}
            />
          </div>
          <div className="my-3">
            <label htmlFor="content">Write about post</label>
            <br />
            <textarea
              name="content"
              type="text"
              id="content"
              rows={4}
              placeholder="write about your posts"
              className="outline-none border p-1 w-full rounded-md"
            />
          </div>
          <div className="my-3">
            <label htmlFor="image">Upload featured image</label>
            <br />
            <input
              name="uploadImg"
              type="file"
              accept="image/png, image/jpeg image/jpg image/webp"
              id="image"
              className=""
            />
          </div>
          <button
            ref={btnRef}
            type="submit"
            className=" bg-blue-600 disabled:bg-blue-400 text-white font-semibold rounded-sm my-2 px-5 py-1 hover:bg-blue-900 hover:scale-105"
          >
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default AddPostForm;
