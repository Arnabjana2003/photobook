import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/services";
import { useState } from "react";
import { useEffect } from "react";

function DeleteBtn({ label = "Delete", className = "text-black", loadFunc }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    services.getPost(slug).then((data) =>{
      setPostData(data)
      console.log(data);
    });
  }, [slug]);

  const deletePost = async () => {
    loadFunc(true);
    console.log(postData.featuredImage);
    const fileDel = await services.deleteFile(postData.featuredImage);
    const postDel = await services.deletePost(postData.$id);
    if (fileDel && postDel) {
      navigate("/all-posts");
    } else {
      alert("Error occur");
    }
    loadFunc(false);
  };

  return (
    <div>
      <button className={className} onClick={deletePost}>
        {label}
      </button>
    </div>
  );
}

export default DeleteBtn;
