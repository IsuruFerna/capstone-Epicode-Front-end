import ActionType from "../actions/action-types/action-types";
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
      firstName: "",
      lastName: "",
      profilePicture: "",
      role: "",
      username: "",
      postAmount: 0,
      following: 0,
      followers: 0,
      isFollowing: false,
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
               data: [
                  ...state.posts.data,
                  ...action.payload.content.filter(
                     (item) =>
                        !state.posts.data.some((post) => post.id === item.id)
                  ),
               ],
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
               firstName: action.payload.firstName,
               lastName: action.payload.lastName,
               profilePicture: action.payload.profilePicture,
               role: action.payload.role,
               username: action.payload.username,
               postAmount: action.payload.postAmount,
               following: action.payload.following,
               followers: action.payload.followers,
               isFollowing: action.payload.isFollowing,
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

      case SelectedUserActionType.UPDATE_FOLLOWERS_COUNT:
         return {
            ...state,
            userData: {
               ...state.userData,
               following: action.payload.following,
               followers: action.payload.followers,
               isFollowing: action.payload.isFollowing,
            },
         };

      case ActionType.PUT_LIKE:
         return {
            ...state,
            posts: {
               ...state.posts,
               data: state.posts.data.map((post) =>
                  post.id === action.payload.id
                     ? {
                          ...post,
                          isLiked: action.payload.isLiked,
                          likeCount: action.payload.likeCount,
                       }
                     : post
               ),
            },
         };

      default:
         return state;
   }
};

export default selectedUserReducer;
