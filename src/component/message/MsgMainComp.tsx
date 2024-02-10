import { useSelector } from "react-redux";
import { ReduxRootState } from "./MsgReceiver";
import { useEffect, useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";

function MsgMainComp() {
   const receiver = useSelector((state: ReduxRootState) => state.receiver);
   const [image, setImage] = useState(receiver.receiver.image);
   const [name, setName] = useState(receiver.receiver.name);

   useEffect(() => {
      setImage(receiver.receiver.image);
      setName(receiver.receiver.name);
   }, [receiver]);

   return (
      <div className="h-100 d-flex flex-column justify-content-between">
         <div className="msg-topbar-light p-3 d-flex align-items-center h-12">
            <Image src={image} className="me-3" roundedCircle />
            <div>
               <h5 className="mb-0">{name}</h5>
               <p className="lh-1 fw-normal text-body-secondary mb-1">Online</p>
            </div>
         </div>
         <div className="d-flex flex-column h-86 justify-content-between">
            <div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">this is sent message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     20:10 2022/04/16
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">this is sent message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     20:10 2022/04/16
                  </p>
               </div>
               <div className="bg-received-msg p-2 m-2 rounded w-75">
                  <p className="mb-0">this is received message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     20:10 2022/04/16
                  </p>
               </div>
               <div className="bg-received-msg p-2 m-2 rounded w-75">
                  <p className="mb-0">this is received message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     20:10 2022/04/16
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">this is sent message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     20:10 2022/04/16
                  </p>
               </div>
               <div className="bg-received-msg p-2 m-2 rounded w-75">
                  <p className="mb-0">this is received message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     20:10 2022/04/16
                  </p>
               </div>
            </div>
            <InputGroup className="p-3 bg-msg-form-container">
               <Form.Control
                  placeholder="Insert message"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
               />
               <Button variant="outline-primary" id="button-addon2">
                  Send
               </Button>
            </InputGroup>
         </div>
      </div>
   );
}

export default MsgMainComp;
