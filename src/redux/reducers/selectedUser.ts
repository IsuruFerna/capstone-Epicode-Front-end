import SelectedUserActionType, {
   ActionSelectedUser,
   SelectedUser,
   SelectedUserPostActionType,
} from "../actions/action-types/selectedUser-types";
import { PostState } from "./post";

interface SelectedUserDataState {
   posts: PostState;
   userData: SelectedUser;
}

const initialState: SelectedUserDataState = {
   posts: {
      loading: false,
      error: null,
      data: [],
      first: null,
      last: null,
      totalPages: null,
      pageNumber: null,
   },
   userData: {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDay: "",
      profilePicture: "",
      role: "",
      loading: false,
      error: null,
   },
};

const selectedUserReducer = (
   state: SelectedUserDataState = initialState,
   action: ActionSelectedUser
) => {
   switch (action.type) {
      case SelectedUserPostActionType.GET_POST_REQUEST:
         return {
            ...state,
            posts: {
               loading: true,
               error: null,
               data: [],
               first: null,
               last: null,
               totalPages: null,
               pageNumber: null,
            },
         };

      case SelectedUserPostActionType.GET_POST_SUCCESS:
         return {
            ...state,
            posts: {
               data: [...state.posts.data, ...action.payload.content],
               first: action.payload.first,
               last: action.payload.last,
               totalPages: action.payload.totalPages,
               pageNumber: action.payload.pageable.pageNumber,
               loading: false,
               error: null,
            },
         };

      case SelectedUserPostActionType.GET_POST_FAIL:
         return {
            ...state,
            posts: {
               loading: false,
               error: action.payload,
               data: null,
               first: null,
               last: null,
               totalPages: null,
               pageNumber: null,
            },
         };

      case SelectedUserActionType.GET_SELECTED_USER_REQUEST:
         return {
            ...state,
            userData: {
               ...state.userData,
               loading: true,
               error: null,
            },
         };

      case SelectedUserActionType.GET_SELECTED_USER_SUCCESS:
         return {
            ...state,
            userData: {
               id: action.payload.id,
               username: action.payload.username,
               firstName: action.payload.firstName,
               lastName: action.payload.lastName,
               email: action.payload.email,
               birthDay: action.payload.birthDay,
               profilePicture: action.payload.profilePicture,
               role: action.payload.role,
               loading: false,
               error: null,
            },
         };

      case SelectedUserActionType.GET_SELECTED_USER_FAIL:
         return {
            ...state,
            userData: {
               ...state.userData,
               loading: false,
               error: action.payload,
            },
         };

      default:
         return state;
   }
};

export default selectedUserReducer;
