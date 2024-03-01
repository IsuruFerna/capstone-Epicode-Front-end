import CommentActionType, {
   CommentAction,
   CommentResponse,
} from "../actions/action-types/comment-types";

type CommentState = {
   loading: boolean;
   error: string | null;
   comments: CommentResponse[];
};

const initialState = {
   loading: false,
   error: null,
   comments: [],
};

const commentReducer = (
   state: CommentState = initialState,
   action: CommentAction
) => {
   switch (action.type) {
      case CommentActionType.GET_COMMENTS_REQUEST:
         return {
            loading: true,
            error: null,
            comments: [],
         };

      // ? set payload based on page or list response
      case CommentActionType.GET_COMMENTS_SUCCESS:
         return {
            loading: false,
            error: null,
            comments: action.payload,
         };

      case CommentActionType.GET_COMMENTS_FAIL:
         return {
            loading: false,
            error: action.payload,
            comments: [],
         };

      case CommentActionType.POST_COMMENT:
         if (!state.comments.includes(action.payload)) {
            return {
               ...state,
               comments: [...state.comments, action.payload],
            };
         } else {
            return state;
         }

      default:
         return state;
   }
};

export default commentReducer;
