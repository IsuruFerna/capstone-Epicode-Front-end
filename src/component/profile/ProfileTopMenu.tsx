import { useEffect, useState } from "react";
import { Fire, PeopleFill, RssFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

type Selection = {
   feed: boolean;
   following: boolean;
   trends: boolean;
};

const ProfileTopMenu = () => {
   const [select, setSelect] = useState<Selection>({
      feed: true,
      following: false,
      trends: false,
   });

   // sets which is clicked
   const selectionSet = (selected: keyof Selection) => {
      setSelect({
         feed: false,
         following: false,
         trends: false,
         [selected]: true,
      });
   };

   // set underline when user clicks on any of feed, following, trends
   // use callback function to set which is clicked
   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const element = e.currentTarget as HTMLDivElement;
      const selected = element.children[1].id as keyof Selection;
      selectionSet(selected);
   };

   const loggedUser = useAppSelector((state) => state.userProfile);

   const location = useLocation();
   const path = location.pathname;
   const pathUserName = path.substring(6, path.length);

   useEffect(() => {
      console.log("this is path user name: ", pathUserName);
      console.log("this is store user: ", loggedUser);
   }, []);

   return (
      <div className="pt-4 px-4 pb-3 primary-border bg-white">
         <div className="primary-top-bar fs-5">
            <p className="text-menu lh-1 pb-1 mb-0 fw-bold">Mark Antony</p>
            <p className="m-0 lh-1 text-secondary fw-normal fs-6">
               32 <span>Posts</span>
            </p>
         </div>
      </div>
   );
};

export default ProfileTopMenu;
