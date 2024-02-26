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

   const [publicChats, setPublicChats] = useState([]);
   const [privateChats, setPrivateChats] = useState(new Map());
   const [tab, setTab] = useState("CHATROOM");

   const [messageList, setMessageList] = useState([]);
   const [messageOutput, setMessageOutput] = useState({
      from: loggedUser.username,
      text: "",
   });

   const [userData, setUserData] = useState({
      username: "",
      receiverName: "",
      connected: false,
      message: "",
   });

   const [stompClient, setStompClient] = useState(null);
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

      return () => {
         disconnect();
      };
   }, [receiver.username]);

   const userJoin = () => {
      let chatMessage = {
         senderName: userData.username,
         status: "JOIN",
      };
      var headers = {};
      headers["Authorization"] = "Bearer " + getItem();

      if (stompClient) {
         stompClient.send("/app/message", headers, JSON.stringify(chatMessage));
         setUserData({ ...userData, message: "" });
      }
   };

   const registerUser = () => {
      connect();
   };

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

         setUserData({
            ...userData,
            connected: true,
         });

         client.subscribe("/chatroom/public", onPublicMessageReceived);
         client.subscribe(
            "/user/" + userData.username + "/private",
            onPrivateMessageReceived
         );

         userJoin();

         // global chat
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

   const onPublicMessageReceived = (payload) => {
      let payloadData = JSON.parse(payload.body);

      switch (payloadData.status) {
         case "JOIN":
            if (!privateChats.get(payloadData.senderName)) {
               privateChats.set(payloadData.senderName, []);
               setPrivateChats(new Map(privateChats));
            }
            break;
         case "MESSAGE":
            publicChats.push(payloadData);
            setPublicChats([...publicChats]);
            break;

         default:
            console.log("Not a defined payload state!");
      }
   };

   const onPrivateMessageReceived = (payload) => {
      let payloadData = JSON.parse(payload.body);
      if (privateChats.get(payloadData.senderName)) {
         privateChats.get(payloadData.senderName).push(payloadData);
         setPrivateChats(new Map(privateChats));
      } else {
         let list = [];
         list.push(payloadData);
         privateChats.set(payloadData.senderName, list);
         setPrivateChats(new Map(privateChats));
      }
   };

   const onError = (error) => {
      console.log(error);
   };

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

   const handleMessage = (e) => {
      setUserData({
         ...userData,
         [e.target.name]: e.target.value,
      });
   };

   const sendPublicMessage = () => {
      if (stompClient) {
         let chatMessage = {
            senderName: userData.username,
            message: userData.message,
            status: "MESSAGE",
         };
         var headers = {};
         headers["Authorization"] = "Bearer " + getItem();

         stompClient.send("/app/message", headers, JSON.stringify(chatMessage));
         setUserData({ ...userData, message: "" });
      }
   };

   const sendPrivateMessage = () => {
      if (stompClient) {
         let chatMessage = {
            senderName: userData.username,
            receiverName: tab,
            message: userData.message,
            status: "MESSAGE",
         };
         var headers = {};
         headers["Authorization"] = "Bearer " + getItem();
         if (userData.username !== tab) {
            privateChats.get(tab).push(chatMessage);
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

      console.log("sending data: ", messageOutput);

      if (stompClient) {
         if (tab === "CHATROOM") {
            sendPublicMessage();
         } else {
            sendPrivateMessage();
         }
         // stompClient.send("/app/chat", {}, JSON.stringify(messageOutput));
         // setMessageOutput({
         //    ...messageOutput,
         //    text: "",
         // });
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
            <div className="temp">
               <ul>
                  <li
                     onClick={() => {
                        setTab("CHATROOM");
                     }}
                     className={
                        tab === "CHATROOM" ? "bg-primary" : "bg-warning"
                     }
                  >
                     Chatroom
                  </li>
                  {[...privateChats.keys()].map((name, index) => (
                     <li
                        onClick={() => {
                           setTab(name);
                        }}
                        className={tab === name ? "bg-primary" : "bg-warning"}
                        key={index}
                     >
                        {name}
                     </li>
                  ))}
               </ul>
            </div>

            <div className="h-86">
               {tab === "CHATROOM" &&
                  publicChats.map((message, index) => {
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
                  })}
               {tab !== "CHATROOM" &&
                  [...privateChats.get(tab)].map((message, index) => {
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
                  })}

               {/* {messageList.map((message, index) => {
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
               })} */}

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

            <div className="temp">
               <input
                  type="text"
                  id="user-id"
                  name="username"
                  placeholder="Enter the user name"
                  value={userData.username}
                  onChange={handleMessage}
               />
               <Button onClick={registerUser}>Join</Button>
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
}

export default MsgMainComp;
