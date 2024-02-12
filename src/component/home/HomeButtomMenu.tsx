import {
   ChatLeftTextFill,
   GearFill,
   HouseFill,
   PersonCircle,
   PlusCircleFill,
} from "react-bootstrap-icons";

const HomeButtomMenu = () => {
   return (
      <div className="d-block d-ms-block d-md-none d-flex justify-content-between px-4 py-2 primary-border fw-semibold align-items-center bg-white">
         <GearFill className="icon-primary-buttom" />
         <PersonCircle className="icon-primary-buttom" />
         <PlusCircleFill className="icon-primary-buttom icon-lg-primary-buttom " />
         <HouseFill className="icon-primary-buttom" />
         <ChatLeftTextFill className="icon-primary-buttom" />
      </div>
   );
};

export default HomeButtomMenu;
