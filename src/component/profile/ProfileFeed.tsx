import { useAppSelector } from "../../redux/hooks/hooks";
import SpinnerGrow from "../UI/SpinnerGrow";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import PostMediaProfile from "../posts/PostMediaProfile";
import PostProfileText from "../posts/PostTextProfile";

const ProfileFeed = () => {
   // gets selected user posts
   const posts = useAppSelector((state) => state.selectedUser.posts);

   return (
      <div className="px-1 mb-5 pb-5">
         {posts.loading ? (
            <SpinnerGrow />
         ) : (
            posts.data &&
            posts.data.map((post: ContentItem) => {
               return post.media ? (
                  <PostMediaProfile key={post.id} post={post} />
               ) : (
                  <PostProfileText key={post.id} post={post} />
               );
            })
         )}

         <div className="d-block d-ms-block d-md-none invisible">""</div>
      </div>
   );
};

export default ProfileFeed;
