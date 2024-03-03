enum CommentActionType {
   GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST",
   GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
   GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL",
   POST_COMMENT = "POST_COMMENT",
   DELETE_POST = "DELETE_POST",
}

export type CommentResponse = {
   id: string;
   comment: string;
   timeStamp: string;
   firstName: string;
   lastName: string;
   username: string;
};

interface GetCommentsRequestAction {
   type: CommentActionType.GET_COMMENTS_REQUEST;
}

interface GetCommentsSuccessAction {
   type: CommentActionType.GET_COMMENTS_SUCCESS;
   payload: CommentResponse[];
}

interface GetCommentsFailAction {
   type: CommentActionType.GET_COMMENTS_FAIL;
   payload: string;
}

interface PostCommentAction {
   type: CommentActionType.POST_COMMENT;
   payload: CommentResponse;
}

interface DeleteCommentAction {
   type: CommentActionType.DELETE_POST;
   payload: string;
}

export type CommentAction =
   | GetCommentsFailAction
   | GetCommentsRequestAction
   | GetCommentsSuccessAction
   | PostCommentAction
   | DeleteCommentAction;

export default CommentActionType;
