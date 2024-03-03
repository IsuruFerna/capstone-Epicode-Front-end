import { ContentItem } from "./action-types";

enum PostActionType {
   UPDATE_POSTED_POST_IN_STORE = "UPDATE_POSTED_POST_IN_STORE",
   ADD_POST_TO_HOME_FEED = "ADD_POST_TO_HOME_FEED",
}

export interface UpdatePostedPostInStore {
   type: PostActionType.UPDATE_POSTED_POST_IN_STORE;
   payload: ContentItem;
}

export interface AddNewPostToHomeFeedAction {
   type: PostActionType.ADD_POST_TO_HOME_FEED;
   payload: ContentItem;
}

export default PostActionType;
