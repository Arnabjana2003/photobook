import React, { useEffect, useRef, useState } from "react";
import services from "../appwrite/services";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSevice from "../appwrite/authService";

function AddPostForm() {
  const btnRef = useRef();
  const currentUser = useSelector((state) => state.authReducer);
  const [titles, setTitles] = useState("");
  const [slugs, setSlugs] = useState("");
  const navigate = useNavigate();

  const handleClick = async (event) => {
    const title = event.title.value;
    const slug = event.slug.value;
    const content = event.content.value;
    const imgFile = event.uploadImg.files[0];

    if (title && slug && content && imgFile) {
      btnRef.current.disabled = true;
      const imgData = await services.uploadFile(imgFile);
      if (imgData) {
        const featuredImage = imgData.$id;
        const userId = currentUser.userData.$id;
        const username = currentUser.userData.name;
        await services.createPost(
          title,
          slug,
          content,
          featuredImage,
          "active",
          userId,
          username
        );
        navigate("/all-posts");
        btnRef.current.disabled = false;
      } else {
        alert("Image not uploaded");
        btnRef.current.disabled = false;
      }
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
  return (
    <div className="w-full h-full flex justify-center items-centerr">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick(e.target);
        }}
        className=" w-4/5 md:w-2/5 lg:w-2/6 border-double p-3 border-4"
      >
        <div className="my-3">
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
          className="px-2 bg-blue-600 disabled:bg-blue-400 text-white font-semibold rounded-md my-2"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;
