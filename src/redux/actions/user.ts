import { Dispatch } from "@reduxjs/toolkit";
import UserActionType, {
   UserProfileAction,
} from "./action-types/user-action-types";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";

export const getLoggedUserAction = () => {
   return async (dispatch: Dispatch<UserProfileAction>) => {
      try {
         dispatch({
            type: UserActionType.GET_LOGGED_PROFILE_REQUEST,
         });

         // gets user token
         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/users/me",
            {
               headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            let userData = await response.json();

            dispatch({
               type: UserActionType.GET_LOGGED_PROFILE_SUCCESS,
               payload: userData,
            });
         } else {
            throw new Error("Retreaving user data error!");
         }
      } catch (error: any) {
         console.log(error);

         dispatch({
            type: UserActionType.GET_LOGGED_PROFILE_FAIL,
            payload: error.message,
         });
      }
   };
};
