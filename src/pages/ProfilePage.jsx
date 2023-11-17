import React, { useEffect, useRef, useState } from "react";
import authService from "../appwrite/authService";
import { Query } from "appwrite";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import AllPosts from "../components/AllPosts";
import Container from "../components/Container";
import InputBox from "../components/InputBox";
import cameraIcon from "../assets/camera.svg";
import services from "../appwrite/services";

function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [cngPic, setCngPic] = useState(false);
  const [oldUser, setOldUser] = useState(false);
  const pic1 = useRef(null);
  const pic2 = useRef(null);
  const saveBtn = useRef(null);
  const cancelBtn = useRef(null);


  useEffect(() => {
    authService.getCurrentUSer().then((data) => {
      services
        .getPost(
          String(import.meta.env.VITE_APPWRITE_USERPIC_COLLECTION_ID),
          data.$id
        )
        .then((picData) => {
          if (picData.profilePic && picData.coverPic) {
            setOldUser(true);
            setUserData({
              ...data,
              profilePic: picData.profilePic,
              coverPic: picData.coverPic,
            });
          } else {
            setUserData(data);
          }
        }).catch(()=>{
          setUserData(data);
        })
    });
  }, []);




  const cngPhoto = async () => {
    if (pic1.current && pic2.current) {
      saveBtn.current.innerText = "Saving";
      saveBtn.current.disabled = true;
      cancelBtn.current.disabled = true;
      if (pic1.current.value && pic2.current.value) {
        services
          .uploadFile(pic1.current.files[0])
          .then((cover) => {
            const coverPic = cover.$id;
            services.uploadFile(pic2.current.files[0]).then((profile) => {
              const profilePic = profile.$id;
              services
                .createPhoto(userData.$id, profilePic, coverPic)
                .then(() => {
                 navigate("/all-posts")
                });
            });
          })
          .catch((err) => alert(err.message))
          .finally(() => {
            saveBtn.current.innerText = "Save";
            saveBtn.current.disabled = false;
            cancelBtn.current.disabled = false;
            setCngPic(false);
          });
      } else {
        alert("Select Cover and Profile photo both");
        saveBtn.current.innerText = "Save";
         saveBtn.current.disabled = false;
         cancelBtn.current.disabled = false;
      }
    }
    
    else {
      if (pic1.current.value) {
        setLoading(true);
        setCngPic(false)
        if (cngPic === "profilePic") {
          services
            .uploadFile(pic1.current.files[0])
            .then((data) => {
              services.updateProfilePhoto(userData.$id, data.$id).then(() => {
                services.deleteFile(userData.profilePic).then(()=>{
                  alert("Successfull, Refresh the page")
                })
              });
            })
            .catch((err) => alert(err.message))
            .finally(() => {
              setCngPic(false);
              setLoading(false);
            });
        } else if (cngPic === "coverPic") {
          services
            .uploadFile(pic1.current.files[0])
            .then((data) => {
              services.updateCoverPhoto(userData.$id, data.$id).then(() => {
                services.deleteFile(userData.coverPic);
              });
            })
            .catch((err) => alert(err.message))
            .finally(() => {
              setCngPic(false);
              setLoading(false);
            });
        }
      } else {
        alert("Please select a photo");
      }
    }
  };
  if (!userData || loading) return <Loading label="Loading Profile" />;
  else {
    return (
      <Container>
        <div className="flex flex-col items-center">
          <div className=" w-full h-[170px] md:h[200px] bg-slate-500 relative">
            <span
              onClick={() => setCngPic("coverPic")}
              className=" absolute top-1 left-1 bg-white p-1 rounded-md"
            >
              <img src={cameraIcon} alt="chnage" className="w-[20px]" />
            </span>
            <div className=" h-full overflow-hidden">
              {oldUser ? (
                <img
                  src={services.previewFile(userData.coverPic)}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {cngPic ? (
              <div className=" absolute top-1/2 w-full flex justify-center z-20">
                <div className="w-[260px] md:w-[330px] bg-slate-100 flex justify-center items-center flex-col rounded-xl p-5 shadow-lg shadow-slate-700">
                  <InputBox
                    ref={pic1}
                    type="file"
                    lable={oldUser ? "Change Photo" : "Upload Cover Photo"}
                  />
                  {!oldUser ? (
                    <InputBox
                      ref={pic2}
                      type="file"
                      lable="Uplaod Profile Photo"
                    />
                  ) : null}
                  <div className=" mt-4">
                    <button
                      className=" bg-blue-600 p-1 text-white rounded-md mx-2 px-2 hover:bg-blue-800 hover:scale-105 disabled:bg-blue-300"
                      onClick={cngPhoto}
                      ref={saveBtn}
                    >
                      Save
                    </button>
                    <button
                      className=" bg-slate-300 p-1 rounded-md mx-2 px- hover:bg-slate-500 disabled:bg-slate-300 hover:scale-105"
                      onClick={() => setCngPic(false)}
                      ref={cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="w-full h-full absolute top-[40%] flex justify-center">
              <div
                className="bg-black text-white rounded-full w-[170px] h-[170px] md:w-[200px] md:h-[200px] z-10 overflow-hidden border-8 border-blue-400 border-double shadow-md shadow-slate-700"
                onClick={() => setCngPic("profilePic")}
              >
                {oldUser ? (
                  <img
                    src={services.previewFile(userData.profilePic)}
                    className="w-full object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-[80px] md:mt-[110px]">
            {userData.name}
          </h2>
          <p>{userData.email}</p>
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
          <AllPosts query={[Query.equal("userId", userData.$id)]} />
        </div>
      </Container>
    );
  }
}

export default ProfilePage;
