import {
   Bookmark,
   CaretDown,
   CaretUp,
   ChevronExpand,
   Dot,
} from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import LikeTextPost from "./LikeTextPost";
import {
   getCommentsAction,
   postCommentsAction,
} from "../../redux/actions/comment_action";
import SpinnerGrow from "../UI/SpinnerGrow";
import useOutsideClick from "../UI/useOutsideClick";

interface PostProps {
   post: ContentItem;
}

const PostTextHome: React.FC<PostProps> = ({ post }) => {
   const selectedUser = useAppSelector((state) => state.selectedUser.userData);
   const loggedUser = useAppSelector((state) => state.userProfile);
   const posts = useAppSelector((state) => state.posts);
   const postComments = useAppSelector((state) => state.comments);
   const dispatch = useAppDispatch();

   const [isLoggedUser, setIsLoggedUser] = useState(false);
   const [showCmt, setShowCmt] = useState(false);
   const [comment, setComment] = useState({
      postId: post.id,
      comment: "",
   });

   const ref = useOutsideClick(() => {
      console.log("clickeed on outside of my component");
      setShowCmt(false);
   });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment({
         ...comment,
         comment: event.target.value,
      });
   };

   const handleShowComments = () => setShowCmt(!showCmt);
   const handlePostComment = () => {
      console.log("this is the posting commnet: ", comment);

      dispatch(postCommentsAction(comment.postId, comment.comment));
      setComment({
         postId: post.id,
         comment: "",
      });
      setShowCmt(true);
   };

   useEffect(() => {
      if (loggedUser.username === selectedUser.username) {
         setIsLoggedUser(true);
      }
   }, [loggedUser.username, selectedUser.username, posts.data?.length]);

   // gets comments
   useEffect(() => {
      if (showCmt) {
         console.log("dispatch get comments");
         dispatch(getCommentsAction(post.id));
      }
   }, [comment.postId, showCmt, dispatch, post.id]);

   return (
      <div className="primary-border primary-shadow content-border-radious mt-2 pt-0">
         <div className="primary-border-buttom primary-shadow content-border-radious p-3">
            <div className="d-flex justify-content-between align-items-start">
               <div className="d-flex align-items-end">
                  <Link
                     className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                     to={"/user/" + post.username}
                  >
                     <h5 className="card-title pe-1 mb-0">
                        {post.firstName + " " + post.lastName}
                     </h5>
                  </Link>
                  <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
                     {"@" + post.username}
                     <Dot />
                     {new Date(post.timeStamp).toLocaleDateString()}
                  </h5>
               </div>
               {isLoggedUser && (
                  <div className="d-flex gap-2 align-items-center pt-1">
                     <EditPost post={post} />
                     <DeletePost post={post} />
                  </div>
               )}
            </div>

            <div className="d-flex justify-contnet-between">
               <div className="card-body primary-border-buttom pb-2">
                  {post.content}
               </div>
               <div className="d-flex flex-column justify-content-around align-items-center ms-2">
                  <Bookmark className="icon-primary-content" />
                  <LikeTextPost postId={post.id} isLiked={post.isLiked} />
                  <CaretDown className="icon-primary-content" />
                  <div ref={ref}>
                     <ChevronExpand
                        onClick={handleShowComments}
                        className="icon-primary-content"
                     />
                  </div>
                  {/* <ViewComment post={post} comment={postComments} /> */}
               </div>
            </div>

            <div className="d-flex justify-content-even">
               <div className="w-100">
                  <label htmlFor="comment"></label>
                  <input
                     id="comment"
                     type="text"
                     value={comment.comment}
                     onChange={handleChange}
                     name="comment"
                     placeholder="Comment"
                     className="comment w-100"
                  />
               </div>
               {comment.comment && (
                  <div
                     id="btn-comment"
                     onClick={handlePostComment}
                     className="comment-post px-2 ms-auto pointer fw-semibold"
                  >
                     Post
                  </div>
               )}
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
                           // TODO: refactor to a component
                           <div key={comment.id} className="p-3">
                              <div className="d-flex justify-content-between align-items-start ">
                                 <div className="d-flex align-items-end">
                                    <Link
                                       className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                       to={"/user/" + comment.username}
                                    >
                                       <h5 className="card-title pe-1 mb-0">
                                          {comment.firstName +
                                             " " +
                                             comment.lastName}
                                       </h5>
                                    </Link>
                                    <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
                                       {"@" + comment.username}
                                       <Dot />
                                       {new Date(
                                          comment.timeStamp
                                       ).toLocaleDateString()}
                                    </h5>
                                 </div>
                                 {isLoggedUser && (
                                    <div className="d-flex gap-2 align-items-center pt-1">
                                       <EditPost post={post} />
                                       <DeletePost post={post} />
                                    </div>
                                 )}
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
                        ))}
                     </div>
                  </div>
               )
            )
         ) : null}
      </div>
   );
};

export default PostTextHome;
