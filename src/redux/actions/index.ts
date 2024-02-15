import { Dispatch } from "react";
import { ReduxReceiver } from "../../component/message/MsgReceiver";
import ActionType, { Action } from "./action-types/action-types";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";

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

         // obtains token from LocalStorage
         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(process.env.REACT_APP_BE_URL + "/posts", {
            headers: {
               "Content-type": "application/json",
               Authorization: "Bearer " + getItem(),
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
