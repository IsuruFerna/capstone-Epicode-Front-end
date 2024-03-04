import { Col, Container, Row } from "react-bootstrap";

import MsgSideBarComp from "../component/message/MsgSideBarComp";
import MsgMainComp from "../component/message/MsgMainComp";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useEffect } from "react";
import { getFollowBackUsersAction } from "../redux/actions/message";
import { TOKEN, useLocalStorage } from "../redux/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const MessagePage = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const followBackList = useAppSelector(
      (state) => state.receiver.messageUsersList
   );
   const loggedUser = useAppSelector((state) => state.selectedUser.userData);

   const { getItem } = useLocalStorage(TOKEN);

   useEffect(() => {
      if (!getItem()) {
         navigate("/login");
      }

      if (loggedUser.error !== null) {
         navigate("/login");
      }

      // fetch message list (only followsback users)
      if (followBackList.users.length === 0) {
         dispatch(getFollowBackUsersAction());
      }
   }, [
      loggedUser.following,
      loggedUser.followers,
      followBackList.users.length,
   ]);

   return (
      <>
         <Container fluid>
            <Row>
               <Col sm={4} className="msg-leftbar-light vh-100 p-0">
                  <MsgSideBarComp />
               </Col>
               <Col sm={8} className="p-0">
                  <MsgMainComp />
               </Col>
            </Row>
         </Container>
      </>
   );
};

export default MessagePage;
