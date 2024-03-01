enum CommentActionType {
   GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST",
   GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
   GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL",
   POST_COMMENT = "POST_COMMENT",
}

export type CommentResponse = {
   id: string;
   comment: string;
   timeStamp: string;
   firstName: string;
   lastName: string;
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

export type CommentAction =
   | GetCommentsFailAction
   | GetCommentsRequestAction
   | GetCommentsSuccessAction
   | PostCommentAction;

export default CommentActionType;
