import { Button, Image } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { setSelectedUserFollowersCountAction } from "../../redux/actions/selectedUser-action";

const ProfileTopOnProfile = () => {
   const selectedUser = useAppSelector((state) => state.selectedUser.userData);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   // when user clicks on a user name, navigates to the user profile
   const handleClickOnName = () => {
      navigate("/user/" + selectedUser.username);
   };

   const handleFollow = () => {
      dispatch(setSelectedUserFollowersCountAction(selectedUser.id));
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
                  <span className="fw-medium">{selectedUser.following}</span>{" "}
                  Following
               </p>
               <p className="m-0 lh-1">
                  <span className="fw-medium">{selectedUser.followers}</span>{" "}
                  Followers
               </p>
            </div>
            <div className="mt-3 w-100">
               <Button
                  onClick={handleFollow}
                  className="w-100"
                  size="sm"
                  variant={
                     selectedUser.isFollowing
                        ? "outline-secondary"
                        : "secondary"
                  }
               >
                  {selectedUser.isFollowing ? "Unfollow" : "Follow"}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default ProfileTopOnProfile;
