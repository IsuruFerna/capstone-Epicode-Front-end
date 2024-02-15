import { useNavigate } from "react-router-dom";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import ProfileTop from "../profile/ProfileTop";
import {
   BoxArrowRight,
   ChatLeftTextFill,
   GearFill,
   HouseFill,
   PersonCircle,
   PlusCircleFill,
} from "react-bootstrap-icons";

const HomeLeftside = () => {
   const { removeItem } = useLocalStorage(TOKEN);
   const navigate = useNavigate();

   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const element = e.currentTarget as HTMLDivElement;
      const selected = element.children[1].id;
      console.log("this is clicked id: ", selected);

      // removes token in the localStorage and redirects to login page
      if (selected === "logout") {
         navigate("/login");
         removeItem();
      }
   };

   return (
      <>
         <div className="vh-100">
            <div className="sticky-top">
               <ProfileTop />
            </div>

            <div className="d-flex flex-column menu-item-color gap-3 bottom-0 start-0 mb-5 ms-4 fixed-bottom w-25">
               <div
                  onClick={handleClick}
                  className="d-flex align-items-center gap-3 pointer"
               >
                  <HouseFill className="icon-primary-buttom fs-4" />
                  <h5 id="home" className="m-0 lh-1">
                     Home
                  </h5>
               </div>
               <div
                  onClick={handleClick}
                  className="d-flex align-items-center gap-3 pointer"
               >
                  <PersonCircle className="icon-primary-buttom fs-4" />
                  <h5 id="profile" className="m-0 lh-1">
                     Profile
                  </h5>
               </div>
               <div
                  onClick={handleClick}
                  className="d-flex align-items-center gap-3 pointer"
               >
                  <PlusCircleFill className="icon-primary-buttom fs-4" />
                  <h5 id="add" className="m-0 lh-1">
                     Add
                  </h5>
               </div>
               <div
                  onClick={handleClick}
                  className="d-flex align-items-center gap-3 pointer"
               >
                  <ChatLeftTextFill className="icon-primary-buttom fs-4" />
                  <h5 id="message" className="m-0 lh-1">
                     Message
                  </h5>
               </div>
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
