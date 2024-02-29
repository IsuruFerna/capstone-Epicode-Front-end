import ActionType, {
   Action,
   ContentItem,
} from "../actions/action-types/action-types";
import PostActionType from "../actions/action-types/post-types";

export interface PostState {
   loading: boolean;
   error: string | null;
   data: ContentItem[];
   first: boolean | null;
   last: boolean | null;
   totalPages: number | null;
   pageNumber: number | null;
}

const initialState = {
   loading: false,
   error: null,
   data: [],
   first: null,
   last: null,
   totalPages: null,
   pageNumber: null,
};

const postReducer = (state: PostState = initialState, action: Action) => {
   switch (action.type) {
      case ActionType.GET_POST_REQUEST:
         return {
            loading: true,
            error: null,
            data: [],
            first: null,
            last: null,
            totalPages: null,
            pageNumber: null,
         };

      case ActionType.GET_POST_SUCCESS:
         return {
            ...state,
            data: [
               ...state.data,
               ...action.payload.content.filter(
                  (item) => !state.data.some((post) => post.id === item.id)
               ),
            ],
            first: action.payload.first,
            last: action.payload.last,
            totalPages: action.payload.totalPages,
            pageNumber: action.payload.pageable.pageNumber,
            loading: false,
            error: null,
         };

      case ActionType.GET_POST_FAIL:
         return {
            loading: false,
            error: action.payload,
            data: null,
            first: null,
            last: null,
            totalPages: null,
            pageNumber: null,
         };

      case PostActionType.UPDATE_POSTED_POST_IN_STORE:
         return {
            ...state,
            data: [action.payload, ...state.data],
         };

      case ActionType.PUT_LIKE: {
         return {
            ...state,
            data: state.data.map((post) =>
               post.id === action.payload.id
                  ? {
                       ...post,
                       isLiked: action.payload.isLiked,
                       likeCount: action.payload.likeCount,
                    }
                  : post
            ),
         };
      }
      default:
         return state;
   }
};

export default postReducer;
