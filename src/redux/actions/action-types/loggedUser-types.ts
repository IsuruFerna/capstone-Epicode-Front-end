enum UserActionType {
   GET_LOGGED_PROFILE_REQUEST = "GET_LOGGED_PROFILE_REQUEST",
   GET_LOGGED_PROFILE_SUCCESS = "GET_LOGGED_PROFILE_SUCCESS",
   GET_LOGGED_PROFILE_FAIL = "GET_LOGGED_PROFILE_FAIL",
}

// export type FetchUserProfileType = {
//    id: string;
//    firstName: string;
//    lastName: string;
//    username: string;
//    email: string;
//    birthDay: string;
//    profilePicture: string;
//    role: string;
// };
export type FetchUserProfileType = {
   id: string;
   firstName: string;
   lastName: string;
   profilePicture: string;
   role: string;
   username: string;
   postAmount: number;
   followings: number;
   followers: number;
   birthDay: String;
   email: string;
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
