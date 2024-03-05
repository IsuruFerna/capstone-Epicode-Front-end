import { Link, useLocation, useNavigate } from "react-router-dom";
import {
   TOKEN,
   USER,
   useLocalStorage,
} from "../../redux/hooks/useLocalStorage";

import {
   BoxArrowRight,
   ChatLeftTextFill,
   GearFill,
   HouseFill,
   PersonCircle,
   Search,
} from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import ProfileTopOnHome from "../profile/ProfileTopOnHome";
import { useEffect, useState } from "react";
import ProfileTopOnProfile from "../profile/ProfileTopOnProfile";
import NewPost from "../posts/NewPost";
import { getLoggedUserAction } from "../../redux/actions/loggedUser";

const HomeLeftside = () => {
   const { removeItem } = useLocalStorage(TOKEN);
   const { removeItem: removeUser, getItem: getUser } = useLocalStorage(USER);
   const navigate = useNavigate();
   const loggedUser = useAppSelector((state) => state.userProfile);
   const dispatch = useAppDispatch();

   // gets user name from the path parameter
   const location = useLocation();
   const path = location.pathname;
   const pathUserName = path.substring(6, path.length);

   const [isLoggedUser, setIsLoggedUser] = useState(true);

   useEffect(() => {
      // handles which component to render based on logged user and clicked userName
      if (pathUserName === "" || pathUserName === loggedUser.username) {
         setIsLoggedUser(true);
      } else {
         setIsLoggedUser(false);
      }

      // in case if user reloads the page requests logged user data
      if (
         loggedUser.firstName === "" ||
         loggedUser.lastName === "" ||
         loggedUser.profilePicture === ""
      ) {
         dispatch(getLoggedUserAction());
      }
   }, [pathUserName, loggedUser.username]);

   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const element = e.currentTarget as HTMLDivElement;
      const selected = element.children[1].id;
      console.log("this is clicked id: ", selected);

      // based on click navigate to the page
      if (selected === "logout") {
         // removes token and user data in the localStorage and redirects to login page
         navigate("/login");
         removeItem();
         removeUser();
      }

      // else if (selected === "home") {
      //    navigate("/");
      // } else if (selected === "profile") {
      //    navigate("/user/" + loggedUser.username);
      // }
   };

   return (
      <>
         <div className="vh-100">
            <div className="sticky-top">
               {/* if path is search renders current user at top else checks is logged user or a selected user */}
               {path === "/search" ? (
                  <ProfileTopOnHome />
               ) : isLoggedUser ? (
                  <ProfileTopOnHome />
               ) : (
                  <ProfileTopOnProfile />
               )}
            </div>

            <div className="d-flex flex-column menu-item-color gap-3 bottom-0 start-0 mb-5 ms-4 fixed-bottom w-25">
               <Link
                  className="d-flex align-items-center gap-3 menu-item-color"
                  to="/"
               >
                  <HouseFill className="icon-primary-buttom fs-4" />
                  <h5 id="home" className="m-0 lh-1">
                     Home
                  </h5>
               </Link>
               <Link
                  className="d-flex align-items-center gap-3 menu-item-color"
                  to="/search"
               >
                  <Search className="icon-primary-buttom fs-4" />
                  <h5 id="search" className="m-0 lh-1">
                     Search
                  </h5>
               </Link>
               <Link
                  className="d-flex align-items-center gap-3 menu-item-color"
                  // to={"/user/" + getUser()?.username}
                  to={"/user/" + loggedUser.username}
               >
                  <PersonCircle className="icon-primary-buttom fs-4" />
                  <h5 id="profile" className="m-0 lh-1">
                     Profile
                  </h5>
               </Link>

               {/* add new post */}
               <NewPost />

               <Link
                  className="d-flex align-items-center gap-3 menu-item-color"
                  to={"/message"}
               >
                  <ChatLeftTextFill className="icon-primary-buttom fs-4" />
                  <h5 id="message" className="m-0 lh-1">
                     Message
                  </h5>
               </Link>

               <div
                  onClick={handleClick}
                  className="d-flex align-items-center gap-3 pointer"
               >
                  <GearFill className="icon-primary-buttom fs-4" />
                  <h5 id="settings" className="m-0 lh-1">
                     Settings
                  </h5>
               </div>
               <div
                  onClick={handleClick}
                  className="d-flex align-items-center gap-3 pointer"
               >
                  <BoxArrowRight className="text-danger fs-4" />
                  <h5 id="logout" className="m-0 lh-1 text-danger">
                     Log out
                  </h5>
               </div>
            </div>
         </div>
      </>
   );
};

export default HomeLeftside;
