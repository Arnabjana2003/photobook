import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogOutBtn from "./LogOutBtn";
import imageIcon from "./../assets/add.svg";
import userIcon from "./../assets/user.jpg";
import homeIcon from "./../assets/home.svg";
import UserIcon from "./UserIcon";
import { useState } from "react";
import { useEffect } from "react";
import services from "../appwrite/services"

function Header() {
  const [profile, setProfile] = useState(false);
  const [img,setImg] = useState();
  const authData = useSelector((state) => state.authReducer);
  useEffect(()=>{
    if(authData.status){
      services
        .getPost(
          String(import.meta.env.VITE_APPWRITE_USERPIC_COLLECTION_ID),
          authData.userData.$id
        )
        .then((picData) => {
          if (picData.profilePic) {
            setImg(services.previewFile(picData.profilePic))
          }
        }).catch(()=>{
          setImg()
        })
    }
  },[authData])
  const navLinks = [
    { name: "Login", slug: "/login", active: !authData.status },
    { name: "SignUp", slug: "/signup", active: !authData.status },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authData.status,
      icon: imageIcon,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      active: authData.status,
      icon: homeIcon,
    },
  ];
  const profileIconLinks = [
    {
      name: "Profile",
      link: "/profile",
      icon: userIcon,
    },
    {
      name: "Add Photo",
      link: "/add-post",
      icon: imageIcon,
    },
  ];
  return (
    <>
      <nav className="min-w-full p-1 flex justify-between items-center bg-slate-200">
        <div>
          <h3 className="text-blue-600 font-bold text-lg md:text-xl lg:text-2xl">
            Photosbook
          </h3>
          <p className=" font-semibold text-[9px] md:text-[11px] lg:text-[13px] text-end leading-[2px]">
            by Arnab
          </p>
        </div>
        <div className=" flex items-center">
          {navLinks.map(
            (item) =>
              item.active && (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? " border-blue-400 border-b-4 text-blue-600 font-bold"
                        : "font-semibold text-slate-900 border-none"
                    } mx-2 text-base md:mx-4 md:text-base p-2`
                  }
                >
                  {item.icon ? (
                    <img className=" w-5 md:w-7 inline" src={item.icon} />
                  ) : (
                    <p className="inline">{item.name}</p>
                  )}
                </NavLink>
              )
          )}
          {authData.status ? (
            <div
              className="pt-2 px-2 relative"
              onClick={() => setProfile((pre) => !pre)}
            >
              <UserIcon img={img} />
              <div
                className={`${
                  profile ? "block" : "hidden"
                } absolute right-0 bg-slate-500 text-white z-10 min-w-max rounded-md p-2`}
              >
                <ul>
                  {profileIconLinks.map((item) => (
                    <li
                      key={item.name}
                      className="m-1 px-3 py-1 block rounded-md hover:bg-blue-700"
                    >
                      <Link to={item.link} className="flex items-center">
                        <img src={item.icon} className="w-3 mr-2" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li className=" px-2 py-1 block rounded-md hover:bg-blue-700">
                    <LogOutBtn width="w-4" text="Logout" />
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
      <hr className=" w-full bg-slate-100 h-[2px]" />
    </>
  );
}

export default Header;
