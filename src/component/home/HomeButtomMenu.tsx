import {
   ChatLeftTextFill,
   GearFill,
   HouseFill,
   PersonCircle,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { USER, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import NewPostMobile from "../posts/NewPostMobile";

const HomeButtomMenu = () => {
   const { getItem: getUser } = useLocalStorage(USER);

   return (
      <div className="d-block d-ms-block d-md-none d-flex justify-content-between px-4 py-2 primary-border fw-semibold align-items-center bg-white">
         <GearFill className="icon-primary-buttom" />
         <Link to={"/user/" + getUser()?.username}>
            <PersonCircle className="icon-primary-buttom" />
         </Link>
         <NewPostMobile />
         <Link to="/">
            <HouseFill className="icon-primary-buttom" />
         </Link>
         <Link to={"/message"}>
            <ChatLeftTextFill className="icon-primary-buttom" />
         </Link>
      </div>
   );
};

export default HomeButtomMenu;
