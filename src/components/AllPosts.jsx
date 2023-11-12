import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import services from "../appwrite/services";
import PostCard from "./PostCard";

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
        <h1>No posts found</h1>
      </>
    );
  }
  return (
    <>
      {posts.map((item) => (
        <div key={item.$id} className=" mx-auto w-[90%] md:w-[300px] flex justify-center my-5">
          <PostCard
            $id={item.$id}
            title={item.title}
            featuredImage={item.featuredImage}
            username = {item.username}
          />
        </div>
      ))}
    </>
  );
}

export default AllPosts;
