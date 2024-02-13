import { FETCH_POSTS, FetchResponseType } from "../actions";

export type PostReceiver = {
   type: typeof FETCH_POSTS;
   payload: FetchResponseType;
};

type PostAction = PostReceiver;

const initialState = {
   posts: [],
};

const postReducer = (state = initialState, action: PostAction) => {
   switch (action.type) {
      case FETCH_POSTS:
         return {
            ...state,
            posts: [...state.posts, action.payload.content],
         };

      default:
         return state;
   }
};

export default postReducer;
