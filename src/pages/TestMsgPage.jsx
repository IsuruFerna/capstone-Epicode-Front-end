import React, { useState } from "react";
import { Container } from "react-bootstrap";

import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;
const TestMsgPage = () => {
   const [userData, setUserData] = useState({
      username: "",
      receiverName: "",
      connected: false,
      message: "",
   });
   const [publicChats, setPublicChats] = useState([]);
   const [privateChats, setPrivateChats] = useState(new Map());
   const [tab, setTab] = useState("CHATROOM");

   const handleUserName = (event) => {
      const { value } = event.target;
      setUserData({ ...userData, username: value });
   };

   const handleValue = (event) => {
      const { value, name } = event.target;
      setUserData({ ...userData, [name]: value });
   };

   const handleMessage = (event) => {
      const { value } = event.target;
      setUserData({ ...userData, message: value });
   };

   const registerUser = () => {
      let Sock = new SockJS("http://localhost:8080/chat");
      stompClient = over(Sock);
      stompClient.connect({}, OnConnected, onError);
   };

   const OnConnected = () => {
      setUserData({ ...userData, connected: true });
      stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
      stompClient.subscribe(
         "/user/" + userData.username + "/private",
         onPrivateMessageReceived
      );
   };

   const userJoin = () => {
      let chatMessage = {
         senderName: userData.username,
         status: "JOIN",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
   };

   const sendPublicMessage = () => {
      if (stompClient) {
         let chatMessage = {
            senderName: userData.username,
            message: userData.message,
            status: "MESSAGE",
         };
         stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
         setUserData({ ...userData, message: "" });
      }
   };

   const sendPrivateMessage = () => {
      if (stompClient) {
         let chatMessage = {
            senderName: userData.username,
            message: userData.message,
            receoverName: tab,
            status: "MESSAGE",
         };
         if (userData.username !== tab) {
            privateChats.set(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
         }
         stompClient.send(
            "/app/private-message",
            {},
            JSON.stringify(chatMessage)
         );
         setUserData({ ...userData, message: "" });
      }
   };

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
            console.log("something went wrong");
      }
   };

   const onPrivateMessageReceived = (payload) => {
      let payloadData = JSON.parse(payload);
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

   const onError = (err) => {
      console.log(err);
   };

   return (
      <Container>
         {userData.connected ? (
            <div>
               <div>
                  <ul>
                     <li>Chatroom</li>
                     {[...privateChats.keys()].map((name, index) => (
                        <li key={index}>{name}</li>
                     ))}
                  </ul>
               </div>

               {tab === "CHATROOM" && (
                  <div>
                     <ul>
                        {publicChats.map((chat, index) => (
                           <li key={index}>
                              {chat.senderName !== userData.username && (
                                 <div>{chat.senderName}</div>
                              )}
                              <div>{chat.message}</div>
                              {chat.senderName === userData.username && (
                                 <div>{chat.senderName}</div>
                              )}
                           </li>
                        ))}
                     </ul>
                     <div>
                        <input
                           type="text"
                           name="message"
                           placeholder="enter public message"
                           onChange={handleValue}
                        />
                        <button onClick={sendPublicMessage}>send</button>
                     </div>
                  </div>
               )}
               {tab !== "CHATROOM" && (
                  <div>
                     <ul>
                        {" "}
                        {[...privateChats.get(tab)].map((chat, index) => (
                           <li key={index}>
                              {chat.senderName !== userData.username && (
                                 <div>{chat.senderName}</div>
                              )}
                              <div>{chat.message}</div>
                              {chat.senderName === userData.username && (
                                 <div>{chat.senderName}</div>
                              )}
                           </li>
                        ))}{" "}
                     </ul>{" "}
                     <div>
                        <input
                           type="text"
                           name="message"
                           placeholder={`enter private message for ${tab}`}
                           onChange={handleValue}
                        />
                        <button onClick={sendPrivateMessage}>send</button>
                     </div>
                  </div>
               )}
            </div>
         ) : (
            <div>
               <input
                  type="text"
                  id="user-name"
                  name="username"
                  placeholder="enter user name"
                  value={userData.username}
                  onChange={handleValue}
               />
               <button type="button" onChange={registerUser}>
                  connect
               </button>
            </div>
         )}
      </Container>
   );
};

export default TestMsgPage;
