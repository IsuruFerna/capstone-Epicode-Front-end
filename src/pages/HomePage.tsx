import React from "react";
import HomeTopMenu from "../component/home/HomeTopMenu";
import HomeButtomMenu from "../component/home/HomeButtomMenu";
import HomeFeed from "../component/home/HomeFeed";

const HomePage = () => {
   return (
      <>
         <div className="vh-100">
            <div className="fixed-top">
               <HomeTopMenu />
            </div>
            <div className="h-75">
               <HomeFeed />
            </div>
            <div className="fixed-bottom">
               <HomeButtomMenu />
            </div>
         </div>
      </>
   );
};

export default HomePage;
