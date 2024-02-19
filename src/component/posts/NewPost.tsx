import { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Form, Image } from "react-bootstrap";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import { ContentItem } from "../../redux/actions/action-types/action-types";
import { updatePostedPostInStateAction } from "../../redux/actions/posts";

export interface NewPostProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type SendingPostType = {
   content: string;
   media: File | null;
};

const NewPost = () => {
   const [show, setShow] = useState(false);
   const [formData, setFormData] = useState<SendingPostType>({
      content: "",
      media: null,
   });

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const { getItem: getToken } = useLocalStorage(TOKEN);

   const dispatch = useAppDispatch();
   const loggedUser = useAppSelector((state) => state.userProfile);

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // handles media input and text input
      const target = event.target as HTMLInputElement;
      let value: File | null | string;
      if (target.name === "media") {
         value = target.files ? target.files[0] : null;
      } else {
         value = target.value;
      }
      setFormData({
         ...formData,
         [target.name]: value,
      });

      console.log("this is form data: ", formData);
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const postData = new FormData();

      if (formData.media) {
         console.log("this contains media: ", formData);
         postData.append("media", formData.media);

         // upload image
         try {
            const mediaResponse = await fetch(
               process.env.REACT_APP_BE_URL + "/posts/media",
               {
                  method: "POST",
                  body: postData,
                  headers: {
                     Authorization: "Bearer " + getToken(),
                  },
               }
            );

            if (mediaResponse.ok) {
               const dataMedia = await mediaResponse.json();
               console.log(
                  "this is the posted media link: ",
                  dataMedia.imageUrl
               );

               // sets media link in formData
               setFormData({
                  ...formData,
                  media: dataMedia.imageUrl,
               });
            }
         } catch (error) {
            console.log(error);
         }
      }

      // posts content(text)
      try {
         const response = await fetch(process.env.REACT_APP_BE_URL + "/posts", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + getToken(),
            },
         });

         if (response.ok) {
            // maybe give a feeback

            // updates redux store posts list
            let data = await response.json();

            console.log("media saved with text: ", data);

            const storePost: ContentItem = {
               ...data,
               firstName: loggedUser.firstName,
               lastName: loggedUser.lastName,
            };

            dispatch(updatePostedPostInStateAction(storePost));

            // closes the post modal
            setShow(false);
         }
      } catch (error) {
         console.log(error);
      }
   };

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
                     {/* <Form.Label>Example textarea</Form.Label> */}
                     <Form.Control
                        autoFocus
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        as="textarea"
                        rows={3}
                     />
                  </Form.Group>
                  <Form.Group controlId="formFileSm" className="mb-3">
                     <Form.Label>Upload Photo</Form.Label>
                     <Form.Control
                        name="media"
                        onChange={handleInputChange}
                        type="file"
                        size="sm"
                     />
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     Close
                  </Button>
                  <Button variant="primary" type="submit">
                     Understood
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
};

export default NewPost;
