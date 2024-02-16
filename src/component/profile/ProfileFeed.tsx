import { useEffect } from "react";

import { getFeedAction } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import SpinnerGrow from "../UI/SpinnerGrow";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { useNavigate } from "react-router-dom";
import ContentText from "../home/ContentText";
import ContentMedia from "../home/ContentMedia";

const ProfileFeed = () => {
   // classical use case
   // const dispatch: Dispatch<any> = useDispatch();
   // const posts = useSelector((state: any) => state.posts);

   // type configured after inside the hooks
   const dispatch = useAppDispatch();
   const posts = useAppSelector((state) => state.posts);
   const navigate = useNavigate();

   // fetch data using redux thunk
   useEffect(() => {
      dispatch(getFeedAction());

      // if there are fetching issues redirects to login
      // try to handle the exact status code(401 instead of all the errors!)
      if (posts.error) {
         navigate("/login");
      }
   }, [dispatch]);

   return (
      <div className="px-1 mb-5 pb-5">
         {posts.loading ? (
            <SpinnerGrow />
         ) : (
            posts.data &&
            posts.data.map((post: ContentItem) => {
               return post.content ? (
                  <ContentText key={post.id} post={post} />
               ) : (
                  <ContentMedia />
               );
            })
         )}

         {/* <ContentMedia /> */}
         <div className="d-block d-ms-block d-md-none invisible">""</div>
      </div>
   );
};

export default ProfileFeed;
