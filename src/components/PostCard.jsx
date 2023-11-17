import { Link } from "react-router-dom";
import services from "../appwrite/services";
import UserIcon from "./UserIcon";
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage, username = "user", time = "",userId}) {
  let img;
  const user = useSelector(state=>state.userReducer.userList)
  user.forEach(item => {
    if(item.$id == userId){
      img = services.previewFile(item.profilePic)
    }
  });
    
  
  
  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-full bg-gray-100 rounded-md">
        <div className="flex justify-between items-center px-3 pt-3">
          <div className="font-bold text-blue-600 md:text-lg flex items-center mb-2">
            <UserIcon img={img} />
            {username}
          </div>
          <p className="text-sm md:text-base">{time}</p>
        </div>
        <h2 className=" px-3 m-2 text-base md:text-lg font-semibold">
          {title}
        </h2>
        <div className="w-full justify-center mb-4">
          <img src={services.previewFile(featuredImage)} alt={title} />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
