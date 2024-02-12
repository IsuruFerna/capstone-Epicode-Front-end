import ContentMedia from "./ContentMedia";
import ContentText from "./ContentText";

const HomeFeed = () => {
   return (
      <div className="mt-5 pt-4 px-1 mb-5 pb-5">
         <ContentText />
         <ContentMedia />
         <div className="invisible">""</div>
      </div>
   );
};

export default HomeFeed;
