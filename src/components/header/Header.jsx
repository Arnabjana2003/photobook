import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogOutBtn from "../LogOutBtn";
import menubar from "../../assets/menu.png";
import addIcon from "../../assets/add.svg";
import homeIcon from "../../assets/home.svg";

function Header() {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authReducer);
  const navLinks = [
    { name: "Login", slug: "/login", active: !authData.status },
    { name: "SignUp", slug: "/signup", active: !authData.status },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authData.status,
      icon: addIcon,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      active: authData.status,
      icon: homeIcon,
    },
  ];
  return (
    <>
      <nav className="min-w-full p-1 flex justify-between items-center bg-slate-200">
        <div className="text-blue-600 font-bold text-lg">Photosbook</div>
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
                    <img className=" w-5 inline" src={item.icon} />
                  ) : (
                    <p className="inline">{item.name}</p>
                  )}
                </NavLink>
              )
          )}
          {authData.status && <LogOutBtn />}
        </div>
        {/* <div className="px-1 md:hidden">
          <img src={menubar} className=" h-5" />
        </div> */}
      </nav>
      <hr className=" w-full bg-slate-100 h-[2px]" />
    </>
  );
}

export default Header;
