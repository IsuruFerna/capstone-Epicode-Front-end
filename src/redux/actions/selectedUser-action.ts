import { Dispatch } from "@reduxjs/toolkit";
import ActionType, { Action } from "./action-types/action-types";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";

export const getUserPostsAction = (userId: string) => {
   return async (dispatch: Dispatch<Action>) => {
      try {
         dispatch({
            type: ActionType.GET_POST_REQUEST,
         });

         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/posts" + userId,
            {
               headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            let userPosts = await response.json();

            dispatch({
               type: ActionType.GET_POST_SUCCESS,
               payload: userPosts,
            });
         } else {
            console.log(response.status);
            throw new Error("Retreaving user posts error!");
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
