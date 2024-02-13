import { ReduxReceiver } from "../../component/message/MsgReceiver";
import { PostReceiver } from "../reducers/post";

export const SWITCH_RECEIVER = "SWITCH_RECEIVER";
export const FETCH_POSTS = "FETCH_POSTS";

type Sort = {
   empty: boolean;
   sorted: boolean;
   unsorted: boolean;
};

type Pageable = {
   offset: number;
   pageNumber: number;
   pageSize: number;
   paged: boolean;
   sort: Sort;
   unpaged: boolean;
};

type ContentItem = {};

export type FetchResponseType = {
   content: ContentItem[];
   empty: boolean;
   first: boolean;
   last: boolean;
   number: number;
   numberOfElements: number;
   pageable: Pageable;
   size: number;
   sort: Sort;
   totalElements: number;
   totalPages: number;
};

export const switchReceiver = (reciever: ReduxReceiver) => {
   return {
      type: SWITCH_RECEIVER,
      payload: reciever,
   };
};

type Dispatch = (action: PostReceiver) => void;

export const getFeedAction = () => {
   return async (dispatch: Dispatch) => {
      try {
         let response = await fetch(process.env.REACT_APP_BE_URL + "/posts", {
            headers: {
               "Content-type": "application/json",
               Authorization:
                  "Bearer " +
                  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ODI0ZmI1MC05YzdmLTQ5YzItYTliZC1jY2Y3YjY2MTA3NTIiLCJpYXQiOjE3MDc3NjkwOTMsImV4cCI6MTcwNzc3OTE3M30.QooU1SxIsx7Xr1JpU-0O02XL37ewVCpwkDmyVcm6Zto",
            },
         });
         if (response.ok) {
            let fetchedFeed = await response.json();
            console.log("this is fetched data redux action: ", fetchedFeed);
            dispatch({
               type: FETCH_POSTS,
               payload: fetchedFeed,
            });
         } else {
            throw new Error("Retreaving feed error!");
         }
      } catch (error) {
         console.log(error);
      }
   };
};
