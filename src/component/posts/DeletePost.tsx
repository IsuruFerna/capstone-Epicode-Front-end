import { useState } from "react";
import { Trash3Fill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import { PostProps } from "./PostMediaProfile";

export interface NewPostProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePost: React.FC<PostProps> = ({ post }) => {
   const [show, setShow] = useState(false);

   // handles close and post buttons
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   // gets localStorage saved data
   const { getItem: getToken } = useLocalStorage(TOKEN);

   const removeImageFetch = async () => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/posts/media/" + post.id,
            {
               method: "DELETE",
               headers: {
                  Authorization: "Bearer " + getToken(),
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            console.log("image deleted");

            // delete post also
            deletePostFetch();
         }
      } catch (error) {
         console.log(error);
      }
      console.log("remove image id: ", post.id);
   };

   const deletePostFetch = async () => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/posts/" + post.id,
            {
               method: "DELETE",
               headers: {
                  Authorization: "Bearer " + getToken(),
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            console.log("image and post deleted");

            // delete post also
         }
      } catch (error) {
         console.log(error);
      }
   };

   // deletes both image and post
   const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
      if (post.media) {
         removeImageFetch();
      } else {
         deletePostFetch();
      }
      setShow(false);
   };

   return (
      <>
         <div
            onClick={handleShow}
            className="d-flex align-items-start gap-1 edit-post-btn pointer"
         >
            <Trash3Fill className="fs-8 m-0" />
            <p id="add" className="mb-0 lh-1 fs-8">
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
               <h5>Are you sure, you want to delete this post?</h5>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Cancel
               </Button>
               <Button variant="danger" onClick={handleDelete}>
                  Delete
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default DeletePost;
