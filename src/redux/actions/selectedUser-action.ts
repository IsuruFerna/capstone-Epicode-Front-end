import { Dispatch } from "react";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";
import SelectedUserActionType, {
   ActionSelectedUser,
   SelectedUserPostActionType,
} from "./action-types/selectedUser-types";

// gets user data by user name
export const getSelectedUserDataAction = (username: string) => {
   return async (dispatch: Dispatch<ActionSelectedUser>) => {
      try {
         dispatch({
            type: SelectedUserActionType.GET_SELECTED_USER_REQUEST,
         });

         const { getItem } = useLocalStorage(TOKEN);
         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/users/user/" + username,
            {
               headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            const userData = await response.json();

            dispatch({
               type: SelectedUserActionType.GET_SELECTED_USER_SUCCESS,
               payload: userData,
            });
         } else {
            console.log(response.status);
            throw new Error("Retreaving user data error!");
         }
      } catch (error: any) {
         console.log(error);

         dispatch({
            type: SelectedUserActionType.GET_SELECTED_USER_FAIL,
            payload: error.message,
         });
      }
   };
};

// gets posts by username
export const getUserPostsAction = (username: string) => {
   return async (dispatch: Dispatch<ActionSelectedUser>) => {
      try {
         dispatch({
            type: SelectedUserPostActionType.GET_POST_REQUEST,
         });

         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/posts/" + username,
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
               type: SelectedUserPostActionType.GET_POST_SUCCESS,
               payload: userPosts,
            });
         } else {
            console.log(response.status);
            throw new Error("Retreaving user posts error!");
         }
      } catch (error: any) {
         console.log(error);

         dispatch({
            type: SelectedUserPostActionType.GET_POST_FAIL,
            payload: error.message,
         });
      }
   };
};
