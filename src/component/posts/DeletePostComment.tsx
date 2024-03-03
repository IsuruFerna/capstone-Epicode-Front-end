import { useState } from "react";
import { Trash3Fill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { deletePostCommentAction } from "../../redux/actions/comment_action";

type DeletePostCommentProps = {
   commentId: string;
};

const DeletePostComment: React.FC<DeletePostCommentProps> = ({ commentId }) => {
   const [show, setShow] = useState(false);
   const dispatch = useAppDispatch();

   // handles close and post buttons
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   // gets localStorage saved data
   const { getItem: getToken } = useLocalStorage(TOKEN);

   const deletePostCommentFetch = async () => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/comments/" + commentId,
            {
               method: "DELETE",
               headers: {
                  Authorization: "Bearer " + getToken(),
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            console.log("comment deleted");

            // delete post also
            dispatch(deletePostCommentAction(commentId));
         }
      } catch (error) {
         console.log(error);
      }
   };

   // deletes comment
   const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
      deletePostCommentFetch();
      setShow(false);
   };

   return (
      <>
         <div
            onClick={handleShow}
            className="d-flex align-items-start gap-1 edit-post-btn pointer"
         >
            <Trash3Fill className="fs-8 m-0 delete" />
            <p id="add" className="mb-0 lh-1 fs-8 delete">
               Delete
            </p>
         </div>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
         >
            {" "}
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
               <h5>Are you sure, you want to delete this comment?</h5>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Cancel
               </Button>
               <Button
                  className="delete"
                  variant="danger"
                  onClick={handleDelete}
               >
                  Delete
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default DeletePostComment;
