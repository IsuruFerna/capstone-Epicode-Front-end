import React from "react";
import HomeTopMenu from "../component/home/HomeTopMenu";
import HomeButtomMenu from "../component/home/HomeButtomMenu";
import HomeFeed from "../component/home/HomeFeed";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
   return (
      <>
         <Container fluid>
            <Row>
               <Col
                  md={4}
                  lg={3}
                  className="d-none d-sm-none d-md-block d-lg-block"
               >
                  <p>left</p>
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

               <Col lg={3} className="d-none d-lg-block">
                  <p>right</p>
               </Col>
            </Row>
         </Container>
      </>
   );
};

export default HomePage;
