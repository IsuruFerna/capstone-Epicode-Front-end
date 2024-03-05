import React from "react";
import { SearchedUserType } from "../../pages/SearchPage";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
   searchedResults: SearchedUserType[] | null;
};

const SearchResultsComp: React.FC<Props> = ({ searchedResults }) => {
   return (
      <>
         {Array.isArray(searchedResults)
            ? searchedResults?.map((user) => (
                 <div
                    key={user.id}
                    className="d-flex align-items-center gap-3 p-3"
                 >
                    <Image src={user.profilePicture} roundedCircle />
                    <div>
                       <Link
                          className="link-dark link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                          to={"/user/" + user.username}
                       >
                          <h5 className="card-title pe-1 mb-0 text-uppercase">
                             {user.firstName + " " + user.lastName}
                          </h5>
                       </Link>
                       <h5 className="fw-lighter text-secondary fs-6 mb-0 lh-base">
                          {"@" + user.username}
                       </h5>
                    </div>
                 </div>
              ))
            : null}
      </>
   );
};

export default SearchResultsComp;
