import UserActionType, {
   FetchUserProfileType,
   UserProfileAction,
} from "../actions/action-types/loggedUser-types";

interface UserProfileState extends FetchUserProfileType {
   loading: boolean;
   error: string | null;
}

const initialState = {
   id: "",
   firstName: "",
   lastName: "",
   profilePicture: "",
   role: "",
   username: "",
   postAmount: 0,
   followings: 0,
   followers: 0,
   birthDay: "",
   email: "",
   loading: false,
   error: null,
};

const userProfileReducer = (
   state: UserProfileState = initialState,
   action: UserProfileAction
) => {
   switch (action.type) {
      case UserActionType.GET_LOGGED_PROFILE_REQUEST:
         return {
            id: "",
            firstName: "",
            lastName: "",
            profilePicture: "",
            role: "",
            username: "",
            postAmount: 0,
            followings: 0,
            followers: 0,
            birthDay: "",
            email: "",
            loading: true,
            error: null,
         };

      case UserActionType.GET_LOGGED_PROFILE_SUCCESS:
         return {
            ...state,
            id: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            profilePicture: action.payload.profilePicture,
            role: action.payload.role,
            username: action.payload.username,
            postAmount: action.payload.postAmount,
            followings: action.payload.followings,
            followers: action.payload.followers,
            birthDay: action.payload.birthDay,
            email: action.payload,
            loading: false,
            error: null,
         };

      case UserActionType.GET_LOGGED_PROFILE_FAIL:
         return {
            id: "",
            firstName: "",
            lastName: "",
            profilePicture: "",
            role: "",
            username: "",
            postAmount: 0,
            followings: 0,
            followers: 0,
            birthDay: "",
            email: "",
            loading: false,
            error: action.payload,
         };

      default:
         return state;
   }
};

export default userProfileReducer;
