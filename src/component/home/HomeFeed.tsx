import ContentMedia from "./ContentMedia";
import ContentText from "./ContentText";

const HomeFeed = () => {
   return (
      <div className="px-1 mb-5 pb-5">
         <ContentText />
         <ContentMedia />
         <div className="d-block d-ms-block d-md-none invisible">""</div>
      </div>
   );
};

export default HomeFeed;
