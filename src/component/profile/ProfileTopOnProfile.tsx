import { Image } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";

const ProfileTopOnProfile = () => {
   const selectedUser = useAppSelector((state) => state.selectedUser.userData);
   const navigate = useNavigate();

   // when user clicks on a user name, navigates to the user profile
   const handleClickOnName = () => {
      navigate("/user/" + selectedUser.username);
   };

   return (
      <div className="d-flex p-4">
         <div className="me-3">
            <Image
               fluid
               src={selectedUser.profilePicture}
               className="rounded-circle"
            />
         </div>
         <div>
            <h5 className="pointer" onClick={handleClickOnName}>
               {selectedUser.firstName + " " + selectedUser.lastName}
            </h5>
            <div className="fw-light text-secondary d-flex fs-8 pt-1 border-top border-secondary-subtle">
               <p className="m-0 pe-2 lh-1">
                  <span className="fw-medium">{selectedUser.followings}</span>{" "}
                  Following
               </p>
               <p className="m-0 lh-1">
                  <span className="fw-medium">{selectedUser.followers}</span>{" "}
                  Followers
               </p>
            </div>
         </div>
      </div>
   );
};

export default ProfileTopOnProfile;
