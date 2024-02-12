import { Image } from "react-bootstrap";
import { Bookmark, ChevronExpand, Heart } from "react-bootstrap-icons";

const ContentMedia = () => {
   return (
      <div className="primary-border content-border-radious mt-2">
         <div className="position-relative">
            <h5 className="card-title content-media-top-bg position-absolute top-0 w-100">
               Tom Hanks
            </h5>
            <div className="d-flex justify-content-center">
               <Image src="https://placedog.net/400/400" />
            </div>
            <div className="position-absolute bottom-0 end-0 w-100 content-media-bottom-bg">
               <p className="m-0 p-0 lh-1 text-end fs-6 fw-light me-2">100k</p>
            </div>
         </div>
         <div className="d-flex justify-contnet-between w-100 mt-1 primary-border-top pt-1">
            <div className="primary-border-top w-80 ms-3">
               <label htmlFor="comment"></label>
               <input
                  id="comment"
                  type="text"
                  placeholder="Comment"
                  className="comment w-100"
               />
            </div>
            <div className="d-flex justify-content-around align-items-start ms-2 ">
               <Bookmark className="icon-primary-content" />
               <Heart className="icon-primary-content fs-1" />
               <ChevronExpand className="icon-primary-content" />
            </div>
         </div>
      </div>
   );
};

export default ContentMedia;
