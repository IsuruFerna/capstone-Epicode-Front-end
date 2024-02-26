import { useEffect, useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks/hooks";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";

const MsgMainComp = () => {
   const receiver = useAppSelector((state) => state.receiver.receiver);
   const loggedUser = useAppSelector((state) => state.userProfile);

   const { getItem } = useLocalStorage(TOKEN);

   const [stompClient, setStompClient] = useState(null);
   const [privateChats, setPrivateChats] = useState(new Map());
   const [userData, setUserData] = useState({
      username: loggedUser.username,
      receiverName: receiver.username,
      connected: false,
      message: "",
   });

   useEffect(() => {
      if (receiver.username && loggedUser.username) {
         console.log("redy to connect to : ", receiver.username);
         setUserData({
            ...userData,
            username: loggedUser.username,
            receiverName: receiver.username,
         });
         connect();
      }

      // insert empity arry with the key of receiver name at the begining
      if (!privateChats.has(receiver.username)) {
         privateChats.set(receiver.username, []);
      }

      return () => {
         disconnect();
      };
   }, [receiver.username, loggedUser.username]);

   const connect = () => {
      // this is sample group
      const socket = new SockJS(process.env.REACT_APP_BE_URL + "/chat");
      const client = over(socket);

      // set header with the token
      const headers = {};
      headers["Authorization"] = "Bearer " + getItem();

      if (loggedUser.username && receiver.username) {
         client.connect(headers, function (frame) {
            console.log("Connected: " + frame);

            setUserData({
               ...userData,
               connected: true,
            });

            client.subscribe(
               "/user/" + loggedUser.username + "/private",
               onPrivateMessageReceived
            );
         });
         setStompClient(client);
      }
   };

   const onPrivateMessageReceived = (payload) => {
      let payloadData = JSON.parse(payload.body);
      let existingChat = privateChats.get(payloadData.senderName);

      if (existingChat) {
         existingChat.push(payloadData);
         setPrivateChats(new Map(privateChats));
      } else {
         existingChat = [payloadData];
      }
      privateChats.set(payloadData.senderName, existingChat);
      setPrivateChats(new Map(privateChats));
   };

   const disconnect = () => {
      if (stompClient !== null) {
         stompClient.disconnect();
      }
      console.log("disconnect!");
   };

   const handleMessage = (e) => {
      setUserData({
         ...userData,
         [e.target.name]: e.target.value,
      });
   };

   const sendPrivateMessage = () => {
      if (stompClient && receiver.username) {
         let chatMessage = {
            senderName: loggedUser.username,
            receiverName: receiver.username,
            message: userData.message,
            // status: "MESSAGE",
         };
         const headers = {};
         headers["Authorization"] = "Bearer " + getItem();
         if (loggedUser.username !== receiver.username) {
            privateChats.get(receiver.username).push(chatMessage);
            setPrivateChats(new Map(privateChats));
         }
         stompClient.send(
            "/app/private-message",
            headers,
            JSON.stringify(chatMessage)
         );
         setUserData({ ...userData, message: "" });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (stompClient) {
         sendPrivateMessage();
      } else {
         console.log("stomp client is null");
      }
   };

   return (
      <div className="h-100 d-flex flex-column">
         <div className="msg-topbar-light p-3 d-flex align-items-center h-12">
            <Image
               src={receiver.profilePicture}
               className="me-3"
               roundedCircle
            />
            <div>
               <h5 className="mb-0">
                  {receiver.firstName + " " + receiver.lastName}
               </h5>
               <p className="lh-1 fw-normal text-body-secondary mb-1">Online</p>
            </div>
         </div>
         <div className="d-flex flex-column justify-content-between flex-fill">
            <div className="h-86">
               {privateChats.get(receiver.username) &&
                  [...privateChats.get(receiver.username)].map(
                     (message, index) => {
                        const formattedDate = new Date().toLocaleDateString();
                        const formattedTime = new Date()
                           .toLocaleTimeString()
                           .substring(0, 5);
                        return loggedUser.username === message.senderName ? (
                           <div
                              key={index}
                              className="bg-sent-msg p-2 m-2 ms-auto rounded w-75 msg-container"
                           >
                              <p className="mb-0">{message.senderName}</p>
                              <p className="mb-0">{message.message}</p>
                              <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                                 {formattedTime + " " + formattedDate}
                              </p>
                           </div>
                        ) : (
                           <div
                              key={index}
                              className="bg-received-msg p-2 m-2 rounded w-75 msg-container"
                           >
                              <p className="mb-0">{message.senderName}</p>
                              <p className="mb-0">{message.message}</p>
                              <p className="fs-7 m-0 lh-1 fw-lighter text-body-secondary text-end">
                                 {formattedTime + " " + formattedDate}
                              </p>
                           </div>
                        );
                     }
                  )}
            </div>

            <Form onSubmit={handleSubmit}>
               <InputGroup className="p-3 bg-msg-form-container">
                  <Form.Control
                     placeholder="Insert message"
                     aria-label="Recipient's username"
                     aria-describedby="basic-addon2"
                     name="message"
                     value={userData.message}
                     onChange={handleMessage}
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
};

export default MsgMainComp;
