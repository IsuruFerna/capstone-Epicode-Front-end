import { Dispatch } from "@reduxjs/toolkit";
import FollowBackActionType, {
   FollowBackUsersAction,
} from "./action-types/message-types";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";

export const getFollowBackUsersAction = () => {
   return async (dispatch: Dispatch<FollowBackUsersAction>) => {
      try {
         dispatch({
            type: FollowBackActionType.GET_FOLLOW_BACK_USER_REQUEST,
         });

         const { getItem } = useLocalStorage(TOKEN);

         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/followUnfollow/followBack",
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            const data = await response.json();

            console.log("this is incoming data: ", data);

            dispatch({
               type: FollowBackActionType.GET_FOLLOW_BACK_USER_SUCCESS,
               payload: data,
            });
         } else {
            throw new Error("Retreaving user followback error");
         }
      } catch (error: any) {
         console.log(error);

         dispatch({
            type: FollowBackActionType.GET_FOLLOW_BACK_USER_FAIL,
            payload: error.message,
         });
      }
   };
};
