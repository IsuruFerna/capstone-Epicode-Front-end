import {
   Bookmark,
   CaretDown,
   CaretUp,
   ChevronExpand,
   Dot,
} from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { Link } from "react-router-dom";

interface PostProps {
   post: ContentItem;
}

const PostTextHome = (props: PostProps) => {
   return (
      <div className="primary-border content-border-radious mt-2 p-3">
         <div className="d-flex align-items-end">
            <Link
               className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
               to={"/user/" + props.post.username}
            >
               <h5 className="card-title pe-1 mb-0">
                  {props.post.firstName + " " + props.post.lastName}
               </h5>
            </Link>
            <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
               {"@" + props.post.username}
               <Dot />
               {new Date(props.post.timeStamp).toLocaleDateString()}
            </h5>
         </div>
         <div className="d-flex justify-contnet-between">
            <div className="card-body primary-border-buttom pb-2">
               {props.post.content}
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

export default PostTextHome;
