import { FetchResponsePostType } from "./action-types";
import { UpdatePostedPostInStore } from "./post-types";

enum SelectedUserActionType {
   GET_SELECTED_USER_REQUEST = "GET_SELECTED_USER_REQUEST",
   GET_SELECTED_USER_SUCCESS = "GET_SELECTED_USER_SUCCESS",
   GET_SELECTED_USER_FAIL = "GET_SELECTED_USER_FAIL",
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
export interface SelectedUser {
   id: string;
   firstName: string;
   lastName: string;
   profilePicture: string;
   role: string;
   username: string;
   postAmount: number;
   followings: number;
   followers: number;
   isFollowing: boolean;
   loading: boolean;
   error: null | string;
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
   | UpdatePostedPostInStore;

export default SelectedUserActionType;
