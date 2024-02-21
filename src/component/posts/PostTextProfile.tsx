import {
   Bookmark,
   CaretDown,
   CaretUp,
   ChevronExpand,
   Dot,
} from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

interface PostProps {
   post: ContentItem;
}

const PostTextProfile: React.FC<PostProps> = ({ post }) => {
   const selectedUser = useAppSelector((state) => state.selectedUser.userData);
   const loggedUser = useAppSelector((state) => state.userProfile);
   const posts = useAppSelector((state) => state.posts);

   const [isLoggedUser, setIsLoggedUser] = useState(false);

   useEffect(() => {
      if (loggedUser.username === selectedUser.username) {
         setIsLoggedUser(true);
      }
   }, [loggedUser.username, selectedUser.username, posts.data?.length]);

   return (
      <div className="primary-border content-border-radious mt-2 p-3">
         <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-end">
               <Link
                  className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"/user/" + selectedUser.username}
               >
                  <h5 className="card-title pe-1 mb-0">
                     {selectedUser.firstName + " " + selectedUser.lastName}
                  </h5>
               </Link>
               <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
                  {"@" + selectedUser.username}
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
               <CaretUp className="icon-primary-content" />
               <CaretDown className="icon-primary-content" />
               <ChevronExpand className="icon-primary-content" />
            </div>
         </div>

         <label htmlFor="comment"></label>
         <input
            id="comment"
            type="text"
            placeholder="Comment"
            className="comment w-92"
         />
      </div>
   );
};

export default PostTextProfile;
