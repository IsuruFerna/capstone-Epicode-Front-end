import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MsgReceiver from "./MsgReceiver";

function MsgBarSearch() {
   return (
      <div>
         <div>
            <InputGroup className="mb-3">
               <Form.Control
                  placeholder="Search"
                  //  aria-label="Recipient's username"
                  //  aria-describedby="basic-addon2"
               />
               <Button variant="outline-secondary" id="button-addon2">
                  Search
               </Button>
            </InputGroup>
         </div>
      </div>
   );
}

export default MsgBarSearch;
