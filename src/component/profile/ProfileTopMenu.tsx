import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

const ProfileTopMenu = () => {
   const user = useAppSelector((state) => state.selectedUser.userData);

   return (
      <div className="pt-4 px-4 pb-3 primary-border bg-white">
         <div className="primary-top-bar fs-5">
            <p className="text-menu lh-1 pb-1 mb-0 fw-bold pointer">
               {user.firstName + " " + user.lastName}
            </p>
            <p className="m-0 lh-1 text-secondary fw-normal fs-6">
               32 <span>Posts</span>
            </p>
         </div>
      </div>
   );
};

export default ProfileTopMenu;
