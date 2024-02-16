import { Image } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks/hooks";

const ProfileTop = () => {
   const loggedUser = useAppSelector((state) => state.userProfile);

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
            <h5>{loggedUser.firstName + " " + loggedUser.lastName}</h5>
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

export default ProfileTop;
