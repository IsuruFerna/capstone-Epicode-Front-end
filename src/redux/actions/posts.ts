import { Dispatch } from "react";
import { ReduxReceiver } from "../../component/message/MsgReceiver";
import ActionType, { Action, ContentItem } from "./action-types/action-types";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";
import PostActionType from "./action-types/post-types";

export const SWITCH_RECEIVER = "SWITCH_RECEIVER";
export const FETCH_POSTS = "FETCH_POSTS";

export const switchReceiver = (reciever: ReduxReceiver) => {
   return {
      type: SWITCH_RECEIVER,
      payload: reciever,
   };
};

export const updatePostedPostInStateAction = (post: ContentItem) => {
   return {
      type: PostActionType.UPDATE_POSTED_POST_IN_STORE,
      payload: post,
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

            dispatch({
               type: ActionType.GET_POST_SUCCESS,
               payload: fetchedFeed,
            });
         } else {
            console.log(response.status);
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
