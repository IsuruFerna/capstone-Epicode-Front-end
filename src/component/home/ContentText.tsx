import {
   Bookmark,
   CaretDown,
   CaretUp,
   ChevronExpand,
} from "react-bootstrap-icons";

const ContentText = () => {
   return (
      <div className="primary-border content-border-radious mt-2 p-3">
         <h5 className="card-title">Tom Cruise</h5>
         <div className="d-flex justify-contnet-between">
            <div className="card-body primary-border-buttom pb-2">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
               tenetur molestiae ea! Accusamus dolorem molestias esse earum
               consequatur doloribus eveniet, itaque nisi vitae? Earum numquam
               quasi vero nisi unde repellat?
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

export default ContentText;
