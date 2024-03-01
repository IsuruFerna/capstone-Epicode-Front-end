import { Image } from "react-bootstrap";
import { Bookmark, ChevronExpand } from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import LikeMediaPost from "./LikeMediaPost";

interface PostProps {
   post: ContentItem;
}

const PostMediaHome: React.FC<PostProps> = ({ post }) => {
   const loggedUser = useAppSelector((state) => state.userProfile);
   const posts = useAppSelector((state) => state.posts);
   const [postMedia, setPostMedia] = useState(post.media);

   const [isLoggedUser, setIsLoggedUser] = useState(false);

   // useEffect(() => {
   //    setPostMedia(post.media);

   //    console.log("new media link: ", post.media);
   // }, [post.media]);

   // ! reconsider
   // useEffect(() => {
   //    if (loggedUser.username === post.username) {
   //       setIsLoggedUser(true);
   //    }
   // }, [loggedUser.username, post.username, posts.data?.length]);

   return (
      <div className="primary-border content-border-radious mt-2">
         <div className="position-relative">
            <div className="position-absolute top-0 w-100 card-title content-media-top-bg d-flex justify-content-between">
               <Link
                  className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"/user/" + post.username}
               >
                  <h5 className="card-title pe-1 mb-0">
                     {post.firstName + " " + post.lastName}
                  </h5>
               </Link>
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
               <p className="m-0 p-0 lh-1 text-end fs-6 fw-light me-2">100k</p>
            </div>
         </div>
         <div className="d-flex justify-contnet-between w-100 mt-1 primary-border-top pt-1">
            <div className="primary-border-top w-100 ms-3">
               <label htmlFor="comment-media"></label>
               <input
                  id="comment-media"
                  type="text"
                  placeholder="Comment"
                  className="comment w-100"
               />
            </div>
            <div className="d-flex justify-content-around align-items-start ms-2 ">
               <Bookmark className="icon-primary-content" />
               <LikeMediaPost postId={post.id} isLiked={post.isLiked} />
               <ChevronExpand className="icon-primary-content" />
            </div>
         </div>
      </div>
   );
};

export default PostMediaHome;
