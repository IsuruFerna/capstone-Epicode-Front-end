import { Col, Container, Row } from "react-bootstrap";

import MsgSideBarComp from "../component/message/MsgSideBarComp";
import MsgMainComp from "../component/message/MsgMainComp";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useEffect } from "react";
import { getFollowBackUsersAction } from "../redux/actions/message";

const MessagePage = () => {
   const dispatch = useAppDispatch();
   const followBackList = useAppSelector(
      (state) => state.receiver.messageUsersList
   );
   const loggedUser = useAppSelector((state) => state.selectedUser.userData);

   useEffect(() => {
      console.log("reading");

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
