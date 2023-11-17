import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import AllPosts from "../components/AllPosts";
import Loading from "../components/Loading";
import { Query } from "appwrite";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import services from "../appwrite/services";

function ViewProfile() {
  const { userId,username } = useParams();
  const [loading, setLoading] = useState(true);
  const [img,setImg] = useState();
  const userList = useSelector((state) => state.userReducer.userList);

  useEffect(()=>{
    if(userList){
      userList.forEach(item => {
        if(item.$id == userId){
          setImg(item)
          console.log(item);
          setLoading(false)
        }else setLoading(false)
      });
    }
  },[userList])

  if (loading) {
    return <Loading lable="Getting Profile Details" />;
  } else {
    return (
      <Container>
        <div className="flex flex-col items-center">
          <div className=" w-full h-[170px] md:h[200px] bg-slate-400 relative">
            <div className=" h-full overflow-hidden">
              {img?(<img
                src={services.previewFile(img.coverPic)}
                className="w-full h-full object-cover"
              />):null}
            </div>
            <div className="w-full h-full absolute top-[40%] flex justify-center">
              <div className="bg-black text-white rounded-full w-[170px] h-[170px] md:w-[200px] md:h-[200px] z-10 overflow-hidden border-8 border-blue-400 border-double shadow-md shadow-slate-700">
              {img?(<img
                src={services.previewFile(img.profilePic)}
                className="w-full h-full object-cover"
              />):null}
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-[80px] md:mt-[110px]">
            {username}
          </h2>
          <div className=" my-3">
            <button
              onClick={() => navigate("/add-post")}
              className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-800 hover:scale-105 shadow-lg shadow-blue-800"
            >
              Create Post
            </button>
          </div>
        </div>
        <div className="mt-3 p-2">
          <p>Posts: </p>
          <AllPosts query={[Query.equal("userId", userId)]} />
        </div>
      </Container>
    );
  }
}

export default ViewProfile;
