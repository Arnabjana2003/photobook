import { useState, useEffect } from "react";
import services from "../appwrite/services";
import PostCard from "./PostCard";
import Loading from "./Loading";

function AllPosts({ query = [] }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLaoding] = useState(false);

  useEffect(() => {
    (async () => {
      const allPosts = await services.getAllPosts(query);
      const datas = [...allPosts.documents].reverse();
      if (datas.length === 0) {
        setPosts("no post");
      } else {
        setPosts(datas);
      }
      setLaoding(false);
    })();
  }, []);

  if (posts.length === 0) {
    return (
      <>
        <Loading label="Getting all posts" />
      </>
    );
  } else if (posts === "no post") {
    return <p className="text-center">No Posts found</p>;
  }
  return (
    <>
      {posts.map((item) => (
        <div
          key={item.$id}
          className=" mx-auto w-full sm:max-w-md flex justify-center my-3"
        >
          <PostCard
            $id={item.$id}
            title={item.title}
            featuredImage={item.featuredImage}
            username={item.username}
            time={item.$createdAt.slice(0, 10)}
          />
        </div>
      ))}
    </>
  );
}

export default AllPosts;
