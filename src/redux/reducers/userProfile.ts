import UserActionType, {
   FetchUserProfileType,
   UserProfileAction,
} from "../actions/action-types/user-action-types";

interface UserProfileState extends FetchUserProfileType {
   loading: boolean;
   error: string | null;
}

const initialState = {
   id: null,
   firstName: null,
   lastName: null,
   username: null,
   email: null,
   birthDay: null,
   profilePicture: null,
   role: null,
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
            id: null,
            firstName: null,
            lastName: null,
            username: null,
            email: null,
            birthDay: null,
            profilePicture: null,
            role: null,
            loading: true,
            error: null,
         };

      case UserActionType.GET_LOGGED_PROFILE_SUCCESS:
         return {
            ...state,
            id: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            username: action.payload.username,
            email: action.payload.email,
            birthDay: action.payload.birthDay,
            profilePicture: action.payload.profilePicture,
            role: action.payload.role,
            loading: false,
            error: null,
         };

      case UserActionType.GET_LOGGED_PROFILE_FAIL:
         return {
            id: null,
            firstName: null,
            lastName: null,
            username: null,
            email: null,
            birthDay: null,
            profilePicture: null,
            role: null,
            loading: false,
            error: action.payload,
         };

      default:
         return state;
   }
};

export default userProfileReducer;
