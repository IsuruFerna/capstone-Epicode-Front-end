import { ContentItem } from "./action-types";

enum PostActionType {
   UPDATE_POSTED_POST_IN_STORE = "UPDATE_POSTED_POST_IN_STORE",
}

export interface UpdatePostedPostInStore {
   type: PostActionType.UPDATE_POSTED_POST_IN_STORE;
   payload: ContentItem;
}

export default PostActionType;
