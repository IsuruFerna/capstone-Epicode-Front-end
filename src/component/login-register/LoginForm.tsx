import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginForm = () => {
   return (
      <Form className="text-secondary primary-border p-3 content-border-radious">
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
               We'll never share your email with anyone else.
            </Form.Text>
         </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
         </Form.Group>
         <div className="w-100 mt-4 d-flex justify-content-between align-items-end">
            <p className="text-secondary fs-7 lh-1 m-0 ps-1">
               <span>Sign up</span>/ <span>Forgot Password</span>
            </p>
            <Button variant="outline-secondary" type="submit">
               Login
            </Button>
         </div>
      </Form>
   );
};

export default LoginForm;
