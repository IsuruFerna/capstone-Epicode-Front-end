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

export interface NewPostProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type SendingPostType = {
   content: string;
   media: null | string;
};

type ModifyPostType = {
   content: string;
   isPhotoDeleted: boolean;
   media: string | File;
};

const EditPost: React.FC<PostProps> = ({ post }) => {
   const [show, setShow] = useState(false);
   const [formData, setFormData] = useState<ModifyPostType>({
      content: post.content || "",
      media: "",
      isPhotoDeleted: false,
   });

   const [newMediaLink, setNewMediaLink] = useState("");

   // handles close and post buttons
   const handleShow = () => setShow(true);
   const handleClose = () => {
      setShow(false);
      setFormData({
         content: post.content || "",
         media: "",
         isPhotoDeleted: false,
      });
   };

   // ? for further improvements
   // const [removeImage, setRemoveImage] = useState(false);
   // const handleRemoveImage = () => {
   //    // setFormData({
   //    //    ...formData,
   //    //    isPhotoDeleted: true,
   //    // });

   //    setRemoveImage(true);
   // };

   // gets localStorage saved data
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

      // sets changed value
      setFormData({
         ...formData,
         [target.name]: value,
      });

      console.log("this is input change: ", formData);
   };

   // *****************************************************************************
   // ? delete image btn for further improvements
   // const removeImageFetch = async () => {
   //    try {
   //       const response = await fetch(
   //          process.env.REACT_APP_BE_URL + "/posts/" + post.id,
   //          {
   //             method: "PATCH",
   //             body: JSON.stringify(formData),
   //             headers: {
   //                Authorization: "Bearer " + getToken(),
   //                "Content-Type": "application/json",
   //             },
   //          }
   //       );

   //       if (response.ok) {
   //          console.log("image deleted");
   //          // setImage(false);
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   //    console.log("remove image id: ", post.id);
   // };

   // modifies post
   const patchPost = async (data: SendingPostType) => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/posts/" + post.id,
            {
               method: "PATCH",
               body: JSON.stringify(data),
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

            const storePost: ContentItem = {
               ...data,
               firstName: loggedUser.firstName,
               lastName: loggedUser.lastName,
               username: loggedUser.username,
            };

            // updates home feed when posted
            dispatch(updatePostedPostInStateAction(storePost));
         }
      } catch (error) {
         console.log(error);
      }
   };

   // modifies media(image)
   const patchPostMedia = async (formData: FormData) => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/posts/media/" + post.id,
            {
               method: "PATCH",
               body: formData,
               headers: {
                  Authorization: "Bearer " + getToken(),
               },
            }
         );

         if (response.ok) {
            // maybe give a feeback

            // updates redux store posts list
            let data = await response.json();

            if (data.imageUrl) {
               // setes new media link with a parameter to handle browser Caching
               // otherwise image does not rerender, because patchPostMedia updates only the image file to the same link
               setNewMediaLink(data.imageUrl + "?t=" + new Date().getTime());
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   // uses await to avoid asynchronous updates
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // update photo
      if (formData.media instanceof File) {
         let sendingFormData = new FormData();
         sendingFormData.append("media", formData.media);
         console.log("this is sending data: ", sendingFormData);
         await patchPostMedia(sendingFormData);
      }

      // set new content and new media
      const updataData: SendingPostType = {
         content: formData.content,
         media: newMediaLink,
      };

      // update new content and medis
      console.log("this is patch post: ", newMediaLink);
      await patchPost(updataData);

      // after posted set values to empty and null
      setFormData({
         ...formData,
         content: "",
         media: "",
      });

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
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        as="textarea"
                        rows={3}
                     />
                  </Form.Group>

                  <div className="position-relative">
                     <Image src={post.media || ""} fluid />

                     {/* ? delete btn for further improvements */}
                     {/* <Button
                        onClick={handleRemoveImage}
                        variant="danger"
                        size="sm"
                        className="m-1 position-absolute top-0 end-0"
                     >
                        <span>Remove Image </span>
                        <Trash3Fill className="mb-1" />
                     </Button> */}
                  </div>

                  <Form.Group controlId="formFileSm" className="mb-3">
                     <Form.Label>Update Photo</Form.Label>
                     <Form.Control
                        name="media"
                        onChange={handleInputChange}
                        type="file"
                        size="sm"
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
                  <Button variant="primary" type="submit">
                     Post
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
};

export default EditPost;
