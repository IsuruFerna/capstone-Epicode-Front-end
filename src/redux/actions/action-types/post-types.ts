import { ContentItem } from "./action-types";

enum PostActionType {
   UPDATE_POSTED_POST_IN_STORE = "UPDATE_POSTED_POST_IN_STORE",
   ADD_POST_TO_HOME_FEED = "ADD_POST_TO_HOME_FEED",
   DELETE_POST = "DELETE_POST",
}

export interface UpdatePostedPostInStore {
   type: PostActionType.UPDATE_POSTED_POST_IN_STORE;
   payload: ContentItem;
}

export interface AddNewPostToHomeFeedAction {
   type: PostActionType.ADD_POST_TO_HOME_FEED;
   payload: ContentItem;
}

export interface DeletePostFromFeedAction {
   type: PostActionType.DELETE_POST;
   payload: string;
}

export default PostActionType;
