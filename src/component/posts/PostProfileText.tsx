import {
   Bookmark,
   CaretDown,
   CaretUp,
   ChevronExpand,
   Dot,
} from "react-bootstrap-icons";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { useAppSelector } from "../../redux/hooks/hooks";

interface PostProps {
   post: ContentItem;
}

const PostProfileText = (props: PostProps) => {
   const user = useAppSelector((state) => state.selectedUser.userData);

   return (
      <div className="primary-border content-border-radious mt-2 p-3">
         <div className="d-flex align-items-end">
            <h5 className="card-title pe-1 mb-0">
               {user.firstName + " " + user.lastName}
            </h5>
            <h5 className="fw-lighter text-secondary fs-6 mb-0">
               {"@" + user.username}
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

export default PostProfileText;
