import { Dispatch } from "react";

import ActionType, { Action, ContentItem } from "./action-types/action-types";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";
import PostActionType from "./action-types/post-types";
import { ReduxReceiver } from "./action-types/message-types";

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

export const addNewPostToHomeFeedAction = (post: ContentItem) => {
   return {
      type: PostActionType.ADD_POST_TO_HOME_FEED,
      payload: post,
   };
};

export const handleLikeAction = (postId: string) => {
   return async (dispatch: Dispatch<Action>) => {
      try {
         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/like/" + postId,
            {
               method: "PUT",
               headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            let data = await response.json();
            let passingData = {
               id: postId,
               isLiked: data.isLiked,
               likeCount: data.likeCount,
            };

            dispatch({
               type: ActionType.PUT_LIKE,
               payload: passingData,
            });

            console.log("this is the data to update");
         }
      } catch (error) {
         console.log(error);
      }
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
