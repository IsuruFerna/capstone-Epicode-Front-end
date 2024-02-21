import { Image } from "react-bootstrap";
import { Bookmark, ChevronExpand, Heart } from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import PostDropDown from "./PostDropDown";
import EditPost from "./EditPost";

export interface PostProps {
   post: ContentItem;
}

const PostMediaProfile: React.FC<PostProps> = ({ post }) => {
   const selectedUser = useAppSelector((state) => state.selectedUser.userData);

   return (
      <div className="primary-border content-border-radious mt-2">
         <div className="position-relative">
            <div className="position-absolute top-0 w-100 card-title content-media-top-bg d-flex justify-content-between">
               <Link
                  className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"/user/" + selectedUser.username}
               >
                  <h5 className="card-title pe-1 mb-0">
                     {selectedUser.firstName + " " + selectedUser.lastName}
                  </h5>
               </Link>
               <div className="d-flex">
                  <EditPost post={post} />
               </div>
            </div>
            {/* <h5 className="card-title content-media-top-bg position-absolute top-0 w-100">
               {user.firstName + " " + user.lastName}
            </h5> */}
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
               <Heart className="icon-primary-content" />
               <ChevronExpand className="icon-primary-content" />
            </div>
         </div>
      </div>
   );
};

export default PostMediaProfile;
