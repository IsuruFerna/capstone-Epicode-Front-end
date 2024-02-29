import React from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { handleLikeAction } from "../../redux/actions/posts";

interface LikeProps {
   postId: string;
   isLiked: boolean;
}

const LikeMediaPost: React.FC<LikeProps> = ({ postId, isLiked }) => {
   const dispatch = useAppDispatch();
   const handleLike = () => {
      dispatch(handleLikeAction(postId));
   };
   return (
      <>
         {isLiked ? (
            <HeartFill onClick={handleLike} className="icon-primary-content" />
         ) : (
            <Heart onClick={handleLike} className="icon-primary-content" />
         )}
      </>
   );
};

export default LikeMediaPost;
