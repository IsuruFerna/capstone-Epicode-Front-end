import { Dispatch } from "react";
import { ReduxReceiver } from "../../component/message/MsgReceiver";
import ActionType, { Action } from "./action-types/action-types";

export const SWITCH_RECEIVER = "SWITCH_RECEIVER";
export const FETCH_POSTS = "FETCH_POSTS";

export const switchReceiver = (reciever: ReduxReceiver) => {
   return {
      type: SWITCH_RECEIVER,
      payload: reciever,
   };
};

export const getFeedAction = () => {
   return async (dispatch: Dispatch<Action>) => {
      try {
         dispatch({
            type: ActionType.GET_POST_REQUEST,
         });

         let response = await fetch(process.env.REACT_APP_BE_URL + "/posts", {
            headers: {
               "Content-type": "application/json",
               Authorization:
                  "Bearer " +
                  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ODI0ZmI1MC05YzdmLTQ5YzItYTliZC1jY2Y3YjY2MTA3NTIiLCJpYXQiOjE3MDc5MDMyNDYsImV4cCI6MTcwNzkxMzMyNn0.HdORxugKVtSRl2AC9QcXhHp_OOshC2J6vckrZXflV8U",
            },
         });

         if (response.ok) {
            let fetchedFeed = await response.json();
            console.log("this is fetched data redux action: ", fetchedFeed);

            dispatch({
               type: ActionType.GET_POST_SUCCESS,
               payload: fetchedFeed,
            });
         } else {
            throw new Error("Retreaving feed error!");
         }
      } catch (error: any) {
         console.log(error);

         dispatch({
            type: ActionType.GET_POST_FAIL,
            payload: error.message,
         });
      }
   };
};
