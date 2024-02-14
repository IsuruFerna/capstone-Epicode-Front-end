import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function SpinnerGrow() {
   return (
      <Row>
         <Col className="d-flex justify-content-center vh-100 align-items-center">
            <Spinner animation="grow" />
         </Col>
      </Row>
   );
}

export default SpinnerGrow;
