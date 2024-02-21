import { useAppSelector } from "../../redux/hooks/hooks";
import SpinnerGrow from "../UI/SpinnerGrow";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import PostFeedText from "../posts/PostTextHome";
import PostMediaHome from "../posts/PostMediaHome";

const HomeFeed = () => {
   // classical use case
   // const dispatch: Dispatch<any> = useDispatch();
   // const posts = useSelector((state: any) => state.posts);

   // type configured after inside the hooks
   // const dispatch = useAppDispatch();
   const posts = useAppSelector((state) => state.posts);

   return (
      <div className="px-1 mb-5 pb-5">
         {posts.loading ? (
            <SpinnerGrow />
         ) : (
            posts.data &&
            posts.data.map((post: ContentItem) => {
               return post.media ? (
                  <PostMediaHome key={post.id} post={post} />
               ) : (
                  <PostFeedText key={post.id} post={post} />
               );
            })
         )}
         <div className="d-block d-ms-block d-md-none invisible">""</div>
      </div>
   );
};

export default HomeFeed;
