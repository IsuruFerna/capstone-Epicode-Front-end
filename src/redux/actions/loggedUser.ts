import { Dispatch } from "@reduxjs/toolkit";
import UserActionType, {
   UserProfileAction,
} from "./action-types/loggedUser-types";
import { TOKEN, USER, useLocalStorage } from "../hooks/useLocalStorage";

export const getLoggedUserAction = () => {
   return async (dispatch: Dispatch<UserProfileAction>) => {
      try {
         dispatch({
            type: UserActionType.GET_LOGGED_PROFILE_REQUEST,
         });

         // gets user token and user data in localStorage
         const { getItem } = useLocalStorage(TOKEN);
         const { setItem: saveUser } = useLocalStorage(USER);

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

            // save user data into localStorage
            const saveUserData = {
               firstName: userData.firstName,
               lastName: userData.lastName,
               id: userData.id,
               profilePicture: userData.profilePicture,
               userName: userData.userData,
            };

            saveUser(saveUserData);
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
