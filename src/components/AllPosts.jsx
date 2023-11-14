import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import services from "../appwrite/services";
import PostCard from "./PostCard";
import Loading from "./Loading";

function AllPosts() {
  
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const allPosts = await services.getAllPosts();
      setPosts([...allPosts.documents]);
    })();
  }, []);
  if (posts.length == 0) {
    return (
      <>
        <Loading label="Getting all posts"/>
      </>
    );
  }
  return (
    <>
      {posts.map((item) => (
        <div key={item.$id} className=" mx-auto w-[90%] md:max-w-md lg:max-w-lg flex justify-center my-5">
          <PostCard
            $id={item.$id}
            title={item.title}
            featuredImage={item.featuredImage}
            username = {item.username}
            time = {item.$createdAt.slice(0,10)}
          />
        </div>
      ))}
    </>
  );
}

export default AllPosts;
