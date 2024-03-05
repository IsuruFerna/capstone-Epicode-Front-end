import { Image } from "react-bootstrap";
import { Bookmark, ChevronExpand, Dot } from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useEffect, useState } from "react";
import LikeMediaPost from "./LikeMediaPost";
import SpinnerGrow from "../UI/SpinnerGrow";
import PostComment from "./PostComment";
import useOutsideClick from "../UI/useOutsideClick";
import {
   getCommentsAction,
   postCommentsAction,
} from "../../redux/actions/comment_action";

export interface PostProps {
   post: ContentItem;
}

const PostMediaProfile: React.FC<PostProps> = ({ post }) => {
   const loggedUser = useAppSelector((state) => state.userProfile);
   const postComments = useAppSelector((state) => state.comments);
   const dispatch = useAppDispatch();

   const [showCmt, setShowCmt] = useState(false);
   const [comment, setComment] = useState({
      postId: post.id,
      comment: "",
   });

   // handles outside clicks
   // closes comments section if the user clicks on not targeted elements
   const ref = useOutsideClick(() => {
      setShowCmt(false);
   });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment({
         ...comment,
         comment: event.target.value,
      });
   };

   const handleShowComments = () => setShowCmt(!showCmt);

   // posts comment using dispatch
   const handlePostComment = () => {
      dispatch(postCommentsAction(comment.postId, comment.comment));
      setComment({
         postId: post.id,
         comment: "",
      });
      setShowCmt(true);
   };

   // gets comments
   useEffect(() => {
      if (showCmt) {
         dispatch(getCommentsAction(post.id));
      }
   }, [comment.postId, showCmt, dispatch, post.id]);

   return (
      <div className="primary-border content-border-radious mt-2">
         <div className="primary-border-buttom primary-shadow content-border-radious">
            <div className="position-relative">
               <div className="position-absolute top-0 w-100 card-title content-media-top-bg d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                     <Link
                        className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                        to={"/user/" + post.username}
                     >
                        <h5 className="card-title pe-1 mb-0 text-uppercase">
                           {post.firstName + " " + post.lastName}
                        </h5>
                     </Link>
                     <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
                        {"@" + post.username}
                        <Dot />
                        {new Date(post.timeStamp).toLocaleDateString()}
                     </h5>
                     {post.edited && (
                        <h5 className="fw-normal text-secondary fs-7 mb-0 lh-base ms-2">
                           Edited
                        </h5>
                     )}
                  </div>
                  {loggedUser.username === post.username && (
                     <div className="d-flex gap-2 align-items-center pt-1">
                        <EditPost post={post} />
                        <DeletePost post={post} />
                     </div>
                  )}
               </div>
               <div className="d-flex flex-column justify-content-center">
                  <Image
                     className="content-border-radious-top"
                     fluid
                     src={post.media || ""}
                  />
                  <p className="px-3 border-top pt-1 mb-1">{post.content}</p>
               </div>

               <div className="position-absolute bottom-0 end-0 w-100 content-media-bottom-bg">
                  <p className="m-0 p-0 lh-1 text-end fs-6 fw-light me-2">
                     100k
                  </p>
               </div>
            </div>
            <div className="d-flex justify-contnet-between w-100 mt-1 primary-border-top pt-1 mb-2">
               <div className="primary-border-top w-100 ms-3 d-flex align-items-center">
                  <label htmlFor="comment-media"></label>
                  <input
                     id="comment-media"
                     type="text"
                     value={comment.comment}
                     onChange={handleChange}
                     name="comment"
                     placeholder="Comment"
                     className="comment w-100"
                  />
                  {comment.comment && (
                     <div
                        id="btn-comment"
                        onClick={handlePostComment}
                        className="comment-post px-2 ms-auto pointer fw-semibold pb-1"
                     >
                        Post
                     </div>
                  )}
               </div>
               <div className="d-flex justify-content-around align-items-start ms-2 ">
                  <Bookmark className="icon-primary-content" />
                  <LikeMediaPost postId={post.id} isLiked={post.isLiked} />
                  <div ref={ref}>
                     <ChevronExpand
                        onClick={handleShowComments}
                        className="icon-primary-content"
                     />
                  </div>
               </div>
            </div>
         </div>
         {showCmt ? (
            postComments.loading ? (
               <SpinnerGrow />
            ) : (
               postComments.comments.length > 0 && (
                  <div className="comments">
                     <div className="primary-border-buttom content-border-radious p-3">
                        {postComments.comments.map((comment) => (
                           // renders each comment
                           <PostComment
                              key={comment.id}
                              loggedUser={loggedUser}
                              comment={comment}
                              post={post}
                           />
                        ))}
                     </div>
                  </div>
               )
            )
         ) : null}
      </div>
   );
};

export default PostMediaProfile;
