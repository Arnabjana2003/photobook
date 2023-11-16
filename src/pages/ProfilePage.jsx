import React, { useEffect, useState } from "react";
import authService from "../appwrite/authService";
import { Query } from "appwrite";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import AllPosts from "../components/AllPosts";
import Container from "../components/Container";

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  useEffect(() => {
    authService.getCurrentUSer().then((data) => {
      setUserData(data);
    });
  }, []);
  if (!userData) return <Loading label="Loading Profile" />;
  else {
    return (
      <Container>
        <div className="flex flex-col items-center">
          <div className=" w-full h-[170px] md:h[200px] bg-slate-600 relative">
            <div className="w-full h-full absolute top-[40%] flex justify-center">
              <div className="bg-black text-white rounded-full w-[170px] h-[170px] md:w-[200px] md:h-[200px] z-10"></div>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-[80px] md:mt-[110px]">
            {userData.name}
          </h2>
          <p>{userData.email}</p>
          <div className=" my-3">
            <button
              onClick={() => navigate("/add-post")}
              className="px-2 py-1 bg-blue-600 text-white rounded-md"
            >
              Create Post
            </button>
          </div>
        </div>
        <div className="mt-3 p-2">
          <p>Posts: </p>
          <AllPosts query={[Query.equal("userId", userData.$id)]} />
        </div>
      </Container>
    );
  }
}

export default ProfilePage;
