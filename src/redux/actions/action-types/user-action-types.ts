enum UserActionType {
   GET_LOGGED_PROFILE_REQUEST = "GET_LOGGED_PROFILE_REQUEST",
   GET_LOGGED_PROFILE_SUCCESS = "GET_LOGGED_PROFILE_SUCCESS",
   GET_LOGGED_PROFILE_FAIL = "GET_LOGGED_PROFILE_FAIL",
}

export type FetchUserProfileType = {
   id: string | null;
   firstName: string | null;
   lastName: string | null;
   username: string | null;
   email: string | null;
   birthDay: string | null;
   profilePicture: string | null;
   role: string | null;
};

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
   | GetUserProfileSuccessAction;

export default UserActionType;
