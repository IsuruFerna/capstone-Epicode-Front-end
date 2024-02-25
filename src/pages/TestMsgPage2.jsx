import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { TOKEN, useLocalStorage } from "../redux/hooks/useLocalStorage";

var stompClient = null;
const TestMsgPage2 = () => {
   const [connected, setConnected] = useState(false);
   const [messageList, setMessageList] = useState([]);
   const [messageOutput, setMessageOutput] = useState({
      from: "",
      text: "",
   });

   const { getItem } = useLocalStorage(TOKEN);

   function connect() {
      var socket = new SockJS(process.env.REACT_APP_BE_URL + "/chat");
      stompClient = over(socket);

      // set header with the token
      var headers = {};
      headers["Authorization"] = "Bearer " + getItem();

      stompClient.connect(headers, function (frame) {
         setConnected(true);
         console.log("Connected: " + frame);
         stompClient.subscribe("/topic/messages", function (messageOutput) {
            const receivedMessage = JSON.parse(messageOutput.body);

            messageList.push(receivedMessage);
            setMessageList([...messageList]);

            console.log(
               "this is the updated list from connection: ",
               messageList
            );
         });
      });
   }

   function disconnect() {
      if (stompClient !== null) {
         stompClient.disconnect();
      }
      setConnected(false);
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
      stompClient.send("/app/chat", {}, JSON.stringify(messageOutput));
      setMessageOutput({
         ...messageOutput,
         text: "",
      });
   };

   return (
      <>
         {!connected ? (
            <div>
               <input type="text" placeholder="Choose a nick name" />
               <button onClick={connect}>Connect</button>
            </div>
         ) : (
            <div>
               <button onClick={disconnect}>disconnect</button>
               <Form onSubmit={handleSubmit}>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlTextarea1"
                  >
                     <Form.Label>Example textarea</Form.Label>
                     <Form.Control
                        as="textarea"
                        name="text"
                        value={messageOutput.text}
                        onChange={handleChange}
                        rows={3}
                     />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                     Send
                  </Button>
               </Form>
            </div>
         )}
      </>
   );
};

export default TestMsgPage2;
