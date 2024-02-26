enum FollowBackActionType {
   GET_FOLLOW_BACK_USER_REQUEST = "GET_FOLLOW_BACK_USER_REQUEST",
   GET_FOLLOW_BACK_USER_SUCCESS = "GET_FOLLOW_BACK_USER_SUCCESS",
   GET_FOLLOW_BACK_USER_FAIL = "GET_FOLLOW_BACK_USER_FAIL",
   SWITCH_RECEIVER = "SWITCH_RECEIVER",
}

export interface ReduxReceiver {
   username: string;
   message: string;
   profilePicture: string;
   id: string;
   firstName: string;
   lastName: string;
}

interface SetReceiver {
   type: FollowBackActionType.SWITCH_RECEIVER;
   payload: ReduxReceiver;
}

interface MessageUsersList {
   username: string;
   profilePicture: string;
   id: string;
   firstName: string;
   lastName: string;
}

// messageUsersList: {
//   users: {
//      user: {
//         id: "",
//         username: "",
//         firstName: "",
//         lastName: "",
//         image: "",
//      },
//      state: false,
//   },
//   loading: true,
//   error: null,
// },

interface GetFollowBackUserRequestAction {
   type: FollowBackActionType.GET_FOLLOW_BACK_USER_REQUEST;
}
interface GetFollowBackUserSuccessAction {
   type: FollowBackActionType.GET_FOLLOW_BACK_USER_SUCCESS;
   payload: MessageUsersList[];
}
interface GetFollowBackUserFailAction {
   type: FollowBackActionType.GET_FOLLOW_BACK_USER_FAIL;
   payload: string;
}

export type FollowBackUsersAction =
   | GetFollowBackUserRequestAction
   | GetFollowBackUserSuccessAction
   | GetFollowBackUserFailAction
   | SetReceiver;

export default FollowBackActionType;
