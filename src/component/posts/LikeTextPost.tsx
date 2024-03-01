import { CaretUp, CaretUpFill } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { handleLikeAction } from "../../redux/actions/posts";

interface LikeProps {
   postId: string;
   isLiked: boolean;
}

const LikeTextPost: React.FC<LikeProps> = ({ postId, isLiked }) => {
   const dispatch = useAppDispatch();

   const handleLike = () => {
      dispatch(handleLikeAction(postId));
   };

   return (
      <>
         {isLiked ? (
            <CaretUpFill
               onClick={handleLike}
               className="icon-primary-content"
            />
         ) : (
            <CaretUp onClick={handleLike} className="icon-primary-content" />
         )}
      </>
   );
};

export default LikeTextPost;
