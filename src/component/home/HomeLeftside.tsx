import ProfileTop from "../profile/ProfileTop";
import {
   ChatLeftTextFill,
   GearFill,
   HouseFill,
   PersonCircle,
   PlusCircleFill,
} from "react-bootstrap-icons";

const HomeLeftside = () => {
   return (
      <>
         <div className="vh-100">
            <div className="sticky-top">
               <ProfileTop />
            </div>

            <div className="d-flex flex-column menu-item-color gap-3 bottom-0 start-0 mb-5 ms-4 fixed-bottom w-25">
               <div className="d-flex align-items-center gap-3">
                  <HouseFill className="icon-primary-buttom fs-4" />
                  <h5 className="m-0 lh-1">Home</h5>
               </div>
               <div className="d-flex align-items-center gap-3">
                  <PersonCircle className="icon-primary-buttom fs-4" />
                  <h5 className="m-0 lh-1">Profile</h5>
               </div>
               <div className="d-flex align-items-center gap-3">
                  <PlusCircleFill className="icon-primary-buttom fs-4" />
                  <h5 className="m-0 lh-1">Add</h5>
               </div>
               <div className="d-flex align-items-center gap-3">
                  <ChatLeftTextFill className="icon-primary-buttom fs-4" />
                  <h5 className="m-0 lh-1">Message</h5>
               </div>
               <div className="d-flex align-items-center gap-3">
                  <GearFill className="icon-primary-buttom fs-4" />
                  <h5 className="m-0 lh-1">Settings</h5>
               </div>
            </div>
         </div>
      </>
   );
};

export default HomeLeftside;
