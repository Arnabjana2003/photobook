import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogOutBtn from "../LogOutBtn";
import menubar from "../../assets/menu.png";

function Header() {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authReducer);
  const navLinks = [
    { name: "Login", slug: "/login", active: !authData.status },
    { name: "SignUp", slug: "/signup", active: !authData.status },
    { name: "Add Post", slug: "/add-post", active: authData.status },
    { name: "All posts", slug: "/all-posts", active: authData.status },
  ];
  return (
    <>
      <nav className="min-w-full bg-blue-500 p-1 flex justify-between items-center">
        <div className="text-slate-200 text-lg font-semibold">
          Photosbook
        </div>
        <div className="">
          {navLinks.map(
            (item) =>
              item.active && (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-red-200 text-lg font-bold" : "text-white"
                    } mx-1 text-sm md:mx-4 md:text-base`
                  }
                >
                  {item.name}
                </NavLink>
              )
          )}
          {authData.status && <LogOutBtn />}
        </div>
        {/* <div className="px-1 md:hidden">
          <img src={menubar} className=" h-5" />
        </div> */}
      </nav>
    </>
  );
}

export default Header;
