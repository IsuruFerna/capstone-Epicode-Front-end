import React from "react";
import { CommentResponse } from "../../redux/actions/action-types/comment-types";
import { CaretDown, CaretUp, Dot } from "react-bootstrap-icons";
import EditPost from "./EditPost";
import { Link } from "react-router-dom";
import { UserProfileState } from "../../redux/reducers/userProfile";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import DeletePostComment from "./DeletePostComment";
import EditPostComment from "./EditPostComment";

type PostCommentProps = {
   comment: CommentResponse;
   loggedUser: UserProfileState;
   post: ContentItem;
};

const PostComment: React.FC<PostCommentProps> = ({
   loggedUser,
   comment,
   post,
}) => {
   return (
      <div key={comment.id} className="p-3">
         <div className="d-flex justify-content-between align-items-start ">
            <div className="d-flex align-items-end">
               <Link
                  className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"/user/" + comment.username}
               >
                  <h5 className="card-title pe-1 mb-0">
                     {comment.firstName + " " + comment.lastName}
                  </h5>
               </Link>
               <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
                  {"@" + comment.username}
                  <Dot />
                  {new Date(comment.timeStamp).toLocaleDateString()}
               </h5>
            </div>

            <div className="d-flex gap-2 align-items-center pt-1">
               {/* user who has commented can delete and edit his own comment */}
               {loggedUser.username === comment.username && (
                  <>
                     <EditPostComment comment={comment} postId={post.id} />
                     <DeletePostComment commentId={comment.id} />
                  </>
               )}

               {/* post owner can delete comments */}
               {loggedUser.username === post.username &&
                  loggedUser.username !== comment.username && (
                     <>
                        <DeletePostComment commentId={comment.id} />
                     </>
                  )}
            </div>
         </div>

         <div className="d-flex justify-contnet-between">
            {/* ? primary-border-buttom  */}
            <div className="card-body primary-border-top pb-2">
               {comment.comment}
            </div>
            <div className="d-flex flex-column justify-content-around align-items-center ms-2">
               {/* <LikeTextPost
            postId={post.id}
            isLiked={post.isLiked}
         /> */}
               <CaretUp className="icon-primary-content" />
               <CaretDown className="icon-primary-content" />
               {/* <ChevronExpand className="icon-primary-content" /> */}
            </div>
         </div>

         {/* <label htmlFor="reply"></label>
   <input
      id="reply"
      type="text"
      placeholder="Reply"
      className="comment w-92"
   /> */}
      </div>
   );
};

export default PostComment;
