import FollowBackActionType, {
   FollowBackUsersAction,
} from "../actions/action-types/message-types";

const initialState = {
   receiver: {
      message: "",
      username: "",
      profilePicture: "",
      id: "",
      firstName: "",
      lastName: "",
   },
   messageUsersList: {
      users: [],
      loading: true,
      error: null,
   },
};

const messageReducer = (
   state = initialState,
   action: FollowBackUsersAction
) => {
   switch (action.type) {
      case FollowBackActionType.SWITCH_RECEIVER:
         return {
            ...state,
            receiver: action.payload,
         };

      case FollowBackActionType.GET_FOLLOW_BACK_USER_REQUEST:
         return {
            ...state,
            messageUsersList: {
               users: [],
               loading: true,
               error: null,
            },
         };

      case FollowBackActionType.GET_FOLLOW_BACK_USER_SUCCESS:
         return {
            ...state,
            messageUsersList: {
               users: action.payload.map((user) => ({
                  id: user.id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  profilePicture: user.profilePicture,
                  state: false,
               })),
               loading: false,
               error: null,
            },
         };

      case FollowBackActionType.GET_FOLLOW_BACK_USER_FAIL:
         return {
            ...state,
            messageUsersList: {
               users: [],
               loading: false,
               error: null,
            },
         };

      default:
         return state;
   }
};

export default messageReducer;
