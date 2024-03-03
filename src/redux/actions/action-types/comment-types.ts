enum CommentActionType {
   GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST",
   GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
   GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL",
   POST_COMMENT = "POST_COMMENT",
   DELETE_COMMENT = "DELETE_COMMENT",
   EDIT_COMMENT = "EDIT_COMMENT",
}

export type CommentResponse = {
   id: string;
   comment: string;
   timeStamp: string;
   firstName: string;
   lastName: string;
   username: string;
   isEdited: boolean;
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
   type: CommentActionType.DELETE_COMMENT;
   payload: string;
}

interface EditCommentAction {
   type: CommentActionType.EDIT_COMMENT;
   payload: CommentResponse;
}

export type CommentAction =
   | GetCommentsFailAction
   | GetCommentsRequestAction
   | GetCommentsSuccessAction
   | PostCommentAction
   | DeleteCommentAction
   | EditCommentAction;

export default CommentActionType;
