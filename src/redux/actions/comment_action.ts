import { Dispatch } from "@reduxjs/toolkit";
import { TOKEN, useLocalStorage } from "../hooks/useLocalStorage";
import CommentActionType, {
   CommentAction,
   CommentResponse,
} from "./action-types/comment-types";

export const deletePostCommentAction = (comentId: string) => {
   return {
      type: CommentActionType.DELETE_COMMENT,
      payload: comentId,
   };
};

export const editPostCommentAction = (comment: CommentResponse) => {
   return {
      type: CommentActionType.EDIT_COMMENT,
      payload: comment,
   };
};

export const postCommentsAction = (postId: string, comment: string) => {
   return async (dispatch: Dispatch<CommentAction>) => {
      try {
         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/comments/" + postId,
            {
               method: "POST",
               body: JSON.stringify({
                  comment: comment,
               }),
               headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            let data: CommentResponse = await response.json();
            console.log("this is posted cmt: ", data);

            dispatch({
               type: CommentActionType.POST_COMMENT,
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };
};

export const getCommentsAction = (postId: string) => {
   return async (dispatch: Dispatch<CommentAction>) => {
      try {
         dispatch({
            type: CommentActionType.GET_COMMENTS_REQUEST,
         });

         const { getItem } = useLocalStorage(TOKEN);

         let response = await fetch(
            process.env.REACT_APP_BE_URL + "/comments/" + postId,
            {
               headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            let data = await response.json();

            dispatch({
               type: CommentActionType.GET_COMMENTS_SUCCESS,
               payload: data,
            });
         }
      } catch (error: any) {
         console.log(error);

         dispatch({
            type: CommentActionType.GET_COMMENTS_FAIL,
            payload: error,
         });
      }
   };
};
