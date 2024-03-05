enum UserActionType {
   GET_LOGGED_PROFILE_REQUEST = "GET_LOGGED_PROFILE_REQUEST",
   GET_LOGGED_PROFILE_SUCCESS = "GET_LOGGED_PROFILE_SUCCESS",
   GET_LOGGED_PROFILE_FAIL = "GET_LOGGED_PROFILE_FAIL",
   SET_LOGGED_FOLLOWING_COUNT = "SET_LOGGED_FOLLOWING_COUNT",
}

export type FetchUserProfileType = {
   id: string;
   firstName: string;
   lastName: string;
   profilePicture: string;
   role: string;
   username: string;
   postAmount: number;
   following: number;
   followers: number;
   birthDay: string;
   email: string;
};

export interface SetLoggedUserFollowingsAction {
   type: UserActionType.SET_LOGGED_FOLLOWING_COUNT;
   payload: boolean;
}

interface GetUserProfileRequestAction {
   type: UserActionType.GET_LOGGED_PROFILE_REQUEST;
}

interface GetUserProfileSuccessAction {
   type: UserActionType.GET_LOGGED_PROFILE_SUCCESS;
   payload: FetchUserProfileType;
}

interface GetUserProfileFailAction {
   type: UserActionType.GET_LOGGED_PROFILE_FAIL;
   payload: string;
}

export type UserProfileAction =
   | GetUserProfileFailAction
   | GetUserProfileRequestAction
   | GetUserProfileSuccessAction
   | SetLoggedUserFollowingsAction;

export default UserActionType;
