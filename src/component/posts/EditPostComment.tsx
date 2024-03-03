import { useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Form, Image } from "react-bootstrap";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { updatePostedPostInStateAction } from "../../redux/actions/posts_action";
import { PostProps } from "./PostMediaProfile";
import { CommentResponse } from "../../redux/actions/action-types/comment-types";
import { editPostCommentAction } from "../../redux/actions/comment_action";

export interface NewPostProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
   comment: CommentResponse;
   postId: string;
};

type EditCommentType = {
   comment: string;
};

const EditPostComment: React.FC<Props> = ({ comment, postId }) => {
   const [show, setShow] = useState(false);
   const [editComment, setEditComment] = useState({
      comment: comment.comment,
   });

   // handles close and post buttons
   const handleShow = () => setShow(true);
   const handleClose = () => {
      setShow(false);
      setEditComment({
         comment: comment.comment,
      });
   };

   // gets localStorage saved data
   const { getItem: getToken } = useLocalStorage(TOKEN);

   const dispatch = useAppDispatch();
   const loggedUser = useAppSelector((state) => state.userProfile);

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // handles media input and text input
      const target = event.target as HTMLInputElement;

      setEditComment({
         comment: target.value,
      });

      console.log("this is input change: ", editComment);
   };

   // modifies post
   const patchComment = async (
      editComment: EditCommentType,
      commetId: string
   ) => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/comments/" + commetId,
            {
               method: "PATCH",
               body: JSON.stringify(editComment),
               headers: {
                  Authorization: "Bearer " + getToken(),
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            // maybe give a feeback

            // updates redux store posts list
            let data = await response.json();
            console.log("this is modified comment: ", data);

            dispatch(editPostCommentAction(data));
         }
      } catch (error) {
         console.log(error);
      }
   };

   // uses await to avoid asynchronous updates
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      patchComment(editComment, comment.id);

      // closes the post modal
      setShow(false);
   };

   return (
      <>
         <div
            onClick={handleShow}
            className="d-flex align-items-start gap-1 edit-post-btn pointer edit-comment"
         >
            <PencilSquare className="fs-8 m-0 edit-comment" />
            <p className="mb-0 lh-1 fs-8 edit-comment">Edit</p>
         </div>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
         >
            {" "}
            <Form onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>
                     <div className="d-flex gap-2 align-items-center">
                        <Image
                           src={loggedUser.profilePicture}
                           className="rounded-circle post-user-img-size"
                        />
                        <div>
                           <h5 className="m-0 lh-1">
                              {loggedUser.firstName + " " + loggedUser.lastName}
                           </h5>
                        </div>
                     </div>
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlTextarea1"
                  >
                     <Form.Control
                        autoFocus
                        className="textarea"
                        value={editComment.comment}
                        onChange={handleInputChange}
                        as="textarea"
                        maxLength={500}
                        rows={3}
                     />
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button
                     className="close-btn"
                     variant="secondary"
                     onClick={handleClose}
                  >
                     Close
                  </Button>
                  <Button className="save" variant="primary" type="submit">
                     Save
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
};

export default EditPostComment;
