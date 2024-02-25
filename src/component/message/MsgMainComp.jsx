import { useEffect, useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks/hooks";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";

function MsgMainComp() {
   const receiver = useAppSelector((state) => state.receiver.receiver);
   const loggedUser = useAppSelector((state) => state.userProfile);

   const { getItem } = useLocalStorage(TOKEN);

   const [messageList, setMessageList] = useState([]);
   const [messageOutput, setMessageOutput] = useState({
      from: loggedUser.username,
      text: "",
   });

   const [stompClient, setStompClient] = useState(null);
   useEffect(() => {
      if (receiver.username && loggedUser.username) {
         console.log("redy to connect to : ", receiver.username);
         connect();
      }

      return () => {
         disconnect();
      };
   }, [receiver.username]);

   function connect() {
      // this is sample group
      const socket = new SockJS(process.env.REACT_APP_BE_URL + "/chat");
      const client = over(socket);

      // set header with the token
      var headers = {};
      headers["Authorization"] = "Bearer " + getItem();

      console.log("can hanlde");
      client.connect(headers, function (frame) {
         console.log("Connected: " + frame);
         client.subscribe("/topic/messages", function (messageOutput) {
            const receivedMessage = JSON.parse(messageOutput.body);

            // messageList.push(receivedMessage);
            // setMessageList([...messageList]);
            setMessageList((prevMessageList) => [
               receivedMessage,
               ...prevMessageList,
            ]);

            console.log(
               "this is the updated list from connection: ",
               messageList
            );
         });
      });

      setStompClient(client);
   }

   function disconnect() {
      if (stompClient !== null) {
         stompClient.disconnect();
      }

      console.log("disconnect!");
   }

   const handleChange = (e) => {
      setMessageOutput({
         ...messageOutput,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      console.log("sending data: ", messageOutput);

      if (stompClient) {
         stompClient.send("/app/chat", {}, JSON.stringify(messageOutput));
         setMessageOutput({
            ...messageOutput,
            text: "",
         });
      } else {
         console.log("stomp client is null");
      }
   };

   return (
      <div className="h-100 d-flex flex-column">
         <div className="msg-topbar-light p-3 d-flex align-items-center h-12">
            <Image src={receiver.image} className="me-3" roundedCircle />
            <div>
               <h5 className="mb-0">
                  {receiver.firstName + " " + receiver.lastName}
               </h5>
               <p className="lh-1 fw-normal text-body-secondary mb-1">Online</p>
            </div>
         </div>
         <div className="d-flex flex-column justify-content-between flex-fill">
            <div className="h-86">
               {messageList.map((message, index) => {
                  const formattedDate = new Date().toLocaleDateString();
                  const formattedTime = new Date()
                     .toLocaleTimeString()
                     .substring(0, 5);
                  return loggedUser.username === message.from ? (
                     <div
                        key={index}
                        className="bg-sent-msg p-2 m-2 rounded w-75 msg-container"
                     >
                        <p className="mb-0">{message.text}</p>
                        <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                           {formattedTime + " " + formattedDate}
                        </p>
                     </div>
                  ) : (
                     <div
                        key={index}
                        className="bg-received-msg p-2 m-2  ms-auto rounded w-75 msg-container"
                     >
                        <p className="mb-0">{message.text}</p>
                        <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                           {formattedTime + " " + formattedDate}
                        </p>
                     </div>
                  );
               })}

               {/* testing */}

               {/* <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div>
               <div className="bg-sent-msg p-2 m-2 ms-auto rounded w-75">
                  <p className="mb-0">message</p>
                  <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                     time
                  </p>
               </div> */}
            </div>
            <Form onSubmit={handleSubmit}>
               <InputGroup className="p-3 bg-msg-form-container">
                  <Form.Control
                     placeholder="Insert message"
                     aria-label="Recipient's username"
                     aria-describedby="basic-addon2"
                     name="text"
                     value={messageOutput.text}
                     onChange={handleChange}
                  />
                  <Button
                     type="submit"
                     variant="outline-primary"
                     id="button-addon2"
                  >
                     Send
                  </Button>
               </InputGroup>
            </Form>
         </div>
      </div>
   );
}

export default MsgMainComp;
