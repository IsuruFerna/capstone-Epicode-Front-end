import { useAppSelector } from "../../redux/hooks/hooks";
import SpinnerGrow from "../UI/SpinnerGrow";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import ContentMedia from "../home/ContentMedia";
import PostText from "../posts/PostProfileText";

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
               return post.content ? (
                  <PostText key={post.id} post={post} />
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
