import { Image } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLoggedUserAction } from "../../redux/actions/loggedUser";

const ProfileTopOnHome = () => {
   const loggedUser = useAppSelector((state) => state.userProfile);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   // when user clicks on a user name, navigates to the user profile
   const handleClickOnName = () => {
      navigate("/user/" + loggedUser.username);
   };

   return (
      <div className="d-flex p-4">
         <div className="me-3">
            <Image
               fluid
               src={loggedUser.profilePicture}
               className="rounded-circle"
            />
         </div>
         <div>
            <h5 className="pointer" onClick={handleClickOnName}>
               {loggedUser.firstName + " " + loggedUser.lastName}
            </h5>
            <div className="fw-light text-secondary d-flex fs-8 pt-1 border-top border-secondary-subtle">
               <p className="m-0 pe-2 lh-1">
                  <span className="fw-medium">100</span> Following
               </p>
               <p className="m-0 lh-1">
                  <span className="fw-medium">100</span> Followers
               </p>
            </div>
         </div>
      </div>
   );
};

export default ProfileTopOnHome;