import { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export interface NewPostProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPost = () => {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <div
            onClick={handleShow}
            className="d-flex align-items-center gap-3 pointer"
         >
            {" "}
            <PlusCircleFill className="icon-primary-buttom fs-4" />
            <h5 id="add" className="m-0 lh-1">
               Add
            </h5>
         </div>
         {/* <Button variant="primary">Launch static backdrop modal</Button> */}

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Header closeButton>
               <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               I will not close if you click outside me. Do not even try to
               press escape key.
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary">Understood</Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default NewPost;
