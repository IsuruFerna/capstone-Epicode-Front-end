import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export interface RegisterModelProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterForm = {
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   birthDay: string;
   password: string;
   passwordConfirm: string;
};

const RegisterModal: React.FC<RegisterModelProps> = ({ show, setShow }) => {
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [formData, setFormData] = useState<RegisterForm>({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      birthDay: "",
      password: "",
      passwordConfirm: "",
   });

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setFormData({
         ...formData,
         [target.name]: target.value,
      });
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("register form data: ", formData);

      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/auth/register",
            {
               method: "POST",
               body: JSON.stringify(formData),
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            setFormData({
               firstName: "",
               lastName: "",
               username: "",
               email: "",
               birthDay: "",
               password: "",
               passwordConfirm: "",
            });

            // sets value to hide registration modal
            setShow(false);
         } else {
            throw new Error(
               "there was a problem of registration: " + response.status
            );
         }
      } catch (error) {
         console.log("error", error);
      }
   };

   return (
      <>
         <Button
            onClick={handleShow}
            className="w-100 mt-3"
            variant="outline-secondary"
            type="submit"
         >
            Sign up
         </Button>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
         >
            <Form onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>Create your account</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Row className="mb-3">
                     <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                           autoFocus
                           required
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleInputChange}
                           type="text"
                           placeholder="First Name"
                        />
                     </Form.Group>

                     <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                           required
                           name="lastName"
                           value={formData.lastName}
                           onChange={handleInputChange}
                           type="text"
                           placeholder="Last Name"
                        />
                     </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridUsername">
                     <Form.Label>Username</Form.Label>
                     <Form.Control
                        required
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Username"
                     />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Enter email"
                     />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridBirthday">
                     <Form.Label>Date of birth</Form.Label>
                     <Form.Control
                        required
                        name="birthDay"
                        onChange={handleInputChange}
                        value={formData.birthDay}
                        type="date"
                        placeholder="Date of birth"
                     />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        type="password"
                        placeholder="Password"
                     />
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="formGridConfirmPassword"
                  >
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control
                        required
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleInputChange}
                        type="password"
                        placeholder="Confirm Password"
                     />
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button type="submit" variant="outline-secondary">
                     Sign up
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
};

export default RegisterModal;
