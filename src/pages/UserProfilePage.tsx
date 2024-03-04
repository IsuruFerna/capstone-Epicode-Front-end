import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeftside from "../component/home/HomeLeftside";
import HomeButtomMenu from "../component/home/HomeButtomMenu";
import ProfileTopMenu from "../component/profile/ProfileTopMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
   getSelectedUserDataAction,
   getUserPostsAction,
} from "../redux/actions/selectedUser-action";
import ProfileFeed from "../component/profile/ProfileFeed";
import { getLoggedUserAction } from "../redux/actions/loggedUser";
import { TOKEN, useLocalStorage } from "../redux/hooks/useLocalStorage";

const UserProfilePage = () => {
   const location = useLocation();
   const path = location.pathname;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const loggedUser = useAppSelector((state) => state.userProfile);
   const selectedUser = useAppSelector((state) => state.selectedUser);
   const { getItem } = useLocalStorage(TOKEN);

   useEffect(() => {
      // gets user name from the path parameter
      const pathUserName = path.substring(6, path.length);

      // fetches and store in redux store, selected user data and selected user posts
      dispatch(getSelectedUserDataAction(pathUserName));
      dispatch(getUserPostsAction(pathUserName));

      if (loggedUser.firstName === "") {
         dispatch(getLoggedUserAction());
      }

      if (!getItem()) {
         navigate("/login");
      }

      if (loggedUser.error !== null) {
         navigate("/login");
      }
   }, [dispatch, path, loggedUser.firstName]);

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
                     <ProfileTopMenu />
                  </div>
                  <div className="h-75">
                     <ProfileFeed />
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

export default UserProfilePage;
