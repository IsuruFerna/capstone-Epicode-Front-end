import { Dispatch } from "react";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";
import SelectedUserActionType, {
   ActionSelectedUser,
   FollowUnfollowResponse,
   SelectedUserPostActionType,
} from "./action-types/selectedUser-types";
import UserActionType from "./action-types/loggedUser-types";

export const setSelectedUserFollowersCountAction = (selectedUserId: string) => {
   return async (dispatch: Dispatch<ActionSelectedUser>) => {
      try {
         const { getItem } = useLocalStorage(TOKEN);

         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/followUnfollow/" + selectedUserId,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            // set store state
            const data: FollowUnfollowResponse = await response.json();

            // sets selected user followers count
            dispatch({
               type: SelectedUserActionType.UPDATE_FOLLOWERS_COUNT,
               payload: data,
            });

            // sets logged user following count
            dispatch({
               type: UserActionType.SET_LOGGED_FOLLOWING_COUNT,
               payload: data.isFollowing,
            });
         } else {
            throw new Error("There is an issue with follow/unfollow");
         }
      } catch (error) {
         console.log("error: ", error);
      }
   };
};

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
