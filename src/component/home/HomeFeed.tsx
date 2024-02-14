import ContentMedia from "./ContentMedia";
import ContentText from "./ContentText";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFeedAction } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useDispatch } from "react-redux";
// import { getFeedAction } from "../../redux/actions";
// import { Dispatch } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

const HomeFeed = () => {
   // const dispatch: Dispatch<any> = useDispatch();
   // const posts = useSelector((state: any) => state.posts);

   const dispatch = useAppDispatch();
   // const dispatch = useDispatch();
   // const store = useAppSelector((state) => state);

   useEffect(() => {
      dispatch(getFeedAction());

      // const fetchFeed = async () => {
      //    try {
      //       let response = await fetch(
      //          process.env.REACT_APP_BE_URL + "/posts",
      //          {
      //             headers: {
      //                "Content-type": "application/json",
      //                Authorization:
      //                   "Bearer " +
      //                   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ODI0ZmI1MC05YzdmLTQ5YzItYTliZC1jY2Y3YjY2MTA3NTIiLCJpYXQiOjE3MDc4NDUzODAsImV4cCI6MTcwNzg1NTQ2MH0.8lnYQmIft7M63l_SJszQaoQs1_S_acCqcTVCCy8uAIA",
      //             },
      //          }
      //       );
      //       if (response.ok) {
      //          let fetchedFeed = await response.json();
      //          console.log("this is fetched data normal: ", fetchedFeed);
      //       } else {
      //          throw new Error("Retrieving feed error!");
      //       }
      //    } catch (error) {
      //       console.log(error);
      //    }
      // };

      // fetchFeed();
      // console.log("this is the store:", store);

      // console.log("this is fetched data redux: ", posts);
   }, [dispatch]);
   return (
      <div className="px-1 mb-5 pb-5">
         <ContentText />
         <ContentMedia />
         <div className="d-block d-ms-block d-md-none invisible">""</div>
      </div>
   );
};

export default HomeFeed;
