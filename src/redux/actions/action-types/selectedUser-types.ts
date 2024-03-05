import { FetchResponsePostType, PutLikeAction } from "./action-types";
import { SetLoggedUserFollowingsAction } from "./loggedUser-types";
import { UpdatePostedPostInStore } from "./post-types";

enum SelectedUserActionType {
   GET_SELECTED_USER_REQUEST = "GET_SELECTED_USER_REQUEST",
   GET_SELECTED_USER_SUCCESS = "GET_SELECTED_USER_SUCCESS",
   GET_SELECTED_USER_FAIL = "GET_SELECTED_USER_FAIL",
   UPDATE_FOLLOWERS_COUNT = "UPDATE_FOLLOWERS_COUNT",
}

export enum SelectedUserPostActionType {
   GET_POST_REQUEST = "GET_POST_REQUEST",
   GET_POST_SUCCESS = "GET_POST_SUCCESS",
   GET_POST_FAIL = "GET_POST_FAIL",
}

// export interface SelectedUser {
//    id: string;
//    username: string;
//    firstName: string;
//    lastName: string;
//    email: string;
//    birthDay: string;
//    profilePicture: string;
//    role: string;
//    loading: boolean;
//    error: null | string;
// }

export interface FollowUnfollowResponse {
   following: number;
   followers: number;
   isFollowing: boolean;
}

export interface SelectedUser extends FollowUnfollowResponse {
   id: string;
   firstName: string;
   lastName: string;
   profilePicture: string;
   role: string;
   username: string;
   postAmount: number;
   loading: boolean;
   error: null | string;
}

interface UpdateSelectedUserFollowersCount {
   type: SelectedUserActionType.UPDATE_FOLLOWERS_COUNT;
   payload: FollowUnfollowResponse;
}

interface GetSelectedUserRequestAction {
   type: SelectedUserActionType.GET_SELECTED_USER_REQUEST;
}

interface GetSelectedUserSuccessAction {
   type: SelectedUserActionType.GET_SELECTED_USER_SUCCESS;
   payload: SelectedUser;
}

interface GetSelectedUserFailAction {
   type: SelectedUserActionType.GET_SELECTED_USER_FAIL;
   payload: SelectedUser;
}

interface GetSelectedUserPostRequestAction {
   type: SelectedUserPostActionType.GET_POST_REQUEST;
}

interface GetSelectedUserPostSuccessAction {
   type: SelectedUserPostActionType.GET_POST_SUCCESS;
   payload: FetchResponsePostType;
}

interface GetSelectedUserPostFailAction {
   type: SelectedUserPostActionType.GET_POST_FAIL;
   payload: string;
}

export type ActionSelectedUser =
   | GetSelectedUserFailAction
   | GetSelectedUserRequestAction
   | GetSelectedUserSuccessAction
   | GetSelectedUserPostFailAction
   | GetSelectedUserPostRequestAction
   | GetSelectedUserPostSuccessAction
   | UpdatePostedPostInStore
   | UpdateSelectedUserFollowersCount
   | SetLoggedUserFollowingsAction
   | PutLikeAction;

export default SelectedUserActionType;
