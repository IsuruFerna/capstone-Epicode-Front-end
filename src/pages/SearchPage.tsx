import HomeButtomMenu from "../component/home/HomeButtomMenu";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeftside from "../component/home/HomeLeftside";
import { useEffect, useState } from "react";
import { TOKEN, useLocalStorage } from "../redux/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import SearchTopbar from "../component/search/SearchTopbar";

import SearchResultsComp from "../component/search/SearchResultsComp";

export type SearchedUserType = {
   id: string;
   username: string;
   firstName: string;
   lastName: string;
   profilePicture: string;
   birthDay: string;
   email: string;
   role: string;
};

const SearchPage = () => {
   const { getItem } = useLocalStorage(TOKEN);
   const navigate = useNavigate();

   const [searchedResults, setSearchedResults] = useState<
      SearchedUserType[] | null
   >(null);

   const loggedUser = useAppSelector((state) => state.userProfile);

   // need to validate if there's already a token in localStorage
   useEffect(() => {
      // checks the token
      // if it's not sends to login page
      if (!getItem()) {
         navigate("/login");
      }

      // redirects to login page if there's any error getting data
      if (loggedUser.error !== null) {
         navigate("/login");
      }
   });

   return (
      <>
         <Container fluid>
            <Row>
               <Col
                  md={4}
                  lg={3}
                  className="d-none d-sm-none d-md-block d-lg-block"
               >
                  <HomeLeftside />
               </Col>

               {/* mid  */}
               <Col md={8} lg={6} className="vh-100 p-0">
                  <div className="sticky-top">
                     <SearchTopbar setSearchedResults={setSearchedResults} />
                  </div>
                  <div className="h-75">
                     {/* <HomeFeed /> */}
                     <SearchResultsComp searchedResults={searchedResults} />
                  </div>
                  {/* only visible in mobile */}
                  <div className="fixed-bottom">
                     <HomeButtomMenu />
                  </div>
               </Col>

               {/* right side of the page */}
               <Col lg={3} className="d-none d-lg-block"></Col>
            </Row>
         </Container>
      </>
   );
};

export default SearchPage;
