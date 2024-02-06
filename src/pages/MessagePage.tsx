import { Col, Container, Row } from "react-bootstrap";

import MsgSideBarComp from "../component/message/MsgSideBarComp";
import MsgMainComp from "../component/message/MsgMainComp";

function MessagePage() {
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
}

export default MessagePage;
