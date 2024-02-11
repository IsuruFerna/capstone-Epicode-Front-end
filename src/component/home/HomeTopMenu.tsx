import React, { useState } from "react";
import { Fire, PeopleFill, RssFill } from "react-bootstrap-icons";

type Selection = {
   feed: boolean;
   following: boolean;
   trends: boolean;
};

const HomeTopMenu = () => {
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

   return (
      <div className="d-block d-sm-none d-flex justify-content-between pt-4 px-4 pb-3 primary-border fw-semibold">
         <div
            className="d-flex flex-column align-items-center"
            onClick={handleClick}
         >
            <div className="primary-top-bar d-flex align-items-center gap-1 fs-5">
               <RssFill className="icon-primary" />
               <p className="text-menu lh-1 pb-1 mb-0">Feed</p>
            </div>
            <div
               className={select.feed ? "primary-underline" : ""}
               id="feed"
            ></div>
         </div>
         <div
            className="d-flex flex-column align-items-center"
            onClick={handleClick}
         >
            <div className="primary-top-bar d-flex align-items-center gap-1 fs-5">
               <PeopleFill className="icon-primary" />
               <p className="text-menu lh-1 pb-1 mb-0">Following</p>
            </div>
            <div
               className={select.following ? "primary-underline" : ""}
               id="following"
            ></div>
         </div>
         <div
            className="d-flex flex-column align-items-center"
            onClick={handleClick}
         >
            <div className="primary-top-bar d-flex align-items-center gap-1 fs-5">
               <Fire className="icon-primary" />
               <p className="text-menu lh-1 pb-1 mb-0">Trends</p>
            </div>
            <div
               className={select.trends ? "primary-underline" : ""}
               id="trends"
            ></div>
         </div>
      </div>
   );
};

export default HomeTopMenu;
