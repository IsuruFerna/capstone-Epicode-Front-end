import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { RegisterModelProps } from "./RegisterModal";

type LoginType = {
   email: string;
   password: string;
};

const LoginForm: React.FC<RegisterModelProps> = ({ show, setShow }) => {
   // appear a model for user registration
   const handleShow = () => setShow(true);

   // set, get and remove token on localStorage
   const { setItem } = useLocalStorage(TOKEN);

   const navigate = useNavigate();

   // set email and password in order to POST fetch request
   const [credentials, setCredentials] = useState<LoginType>({
      email: "",
      password: "",
   });

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setCredentials({
         ...credentials,
         [target.name]: target.value,
      });
   };

   // when login success
   // save token in the localStorage
   // navigate to home
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/auth/login",
            {
               method: "POST",
               body: JSON.stringify(credentials),
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            const data = await response.json();
            const token = data.token;

            // saves token
            setItem(token);

            setCredentials({
               email: "",
               password: "",
            });

            // navigate to home
            navigate("/");
         } else {
            throw new Error("there was a problem of login");
         }
      } catch (error) {
         console.log("error", error);
      }
   };

   return (
      <Form
         onSubmit={handleSubmit}
         className="text-secondary primary-border p-3 content-border-radious"
      >
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
               required
               onChange={handleInputChange}
               value={credentials.email}
               name="email"
               type="email"
               placeholder="Enter email"
            />
            <Form.Text className="text-muted">
               We'll never share your email with anyone else.
            </Form.Text>
         </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
               required
               onChange={handleInputChange}
               value={credentials.password}
               name="password"
               type="password"
               placeholder="Password"
            />
         </Form.Group>
         <div className="w-100 mt-4 d-flex justify-content-between align-items-end">
            <p className="text-secondary fs-7 lh-1 m-0 ps-1">
               <span className="pointer" onClick={handleShow}>
                  Sign up
               </span>
               / <span>Forgot Password</span>
            </p>
            <Button variant="outline-secondary" type="submit">
               Login
            </Button>
         </div>
      </Form>
   );
};

export default LoginForm;
