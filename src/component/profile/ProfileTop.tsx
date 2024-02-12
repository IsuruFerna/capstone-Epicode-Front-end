import { Image } from "react-bootstrap";

const ProfileTop = () => {
   return (
      <div className="d-flex p-4">
         <div className="me-3">
            <Image
               fluid
               src="https://placedog.net/80/80"
               className="rounded-circle"
            />
         </div>
         <div>
            <h5>Mark Antony</h5>
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
