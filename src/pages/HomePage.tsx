import HomeTopMenu from "../component/home/HomeTopMenu";
import HomeButtomMenu from "../component/home/HomeButtomMenu";
import HomeFeed from "../component/home/HomeFeed";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeftside from "../component/home/HomeLeftside";
import { useEffect } from "react";
import { TOKEN, useLocalStorage } from "../redux/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
   const { getItem } = useLocalStorage(TOKEN);
   const navigate = useNavigate();

   // checks the token
   // if it's not sends to login page

   // need to validate if there's already a token in localStorage
   useEffect(() => {
      if (!getItem()) {
         navigate("/login");
      }
   }, []);

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
                     <HomeTopMenu />
                  </div>
                  <div className="h-75">
                     <HomeFeed />
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

export default HomePage;
