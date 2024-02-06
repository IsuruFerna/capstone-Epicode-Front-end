import { useSelector } from "react-redux";
import { ReduxRootState } from "./MsgReceiver";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

function MsgMainComp() {
   const receiver = useSelector((state: ReduxRootState) => state.receiver);
   const [image, setImage] = useState(receiver.receiver.image);
   const [name, setName] = useState(receiver.receiver.name);

   useEffect(() => {
      setImage(receiver.receiver.image);
      setName(receiver.receiver.name);
   }, [receiver]);

   return (
      <div className="msg-topbar-light p-3 d-flex align-items-center">
         <Image src={image} className="me-3" roundedCircle />
         <div>
            <h5 className="mb-0">{name}</h5>
            <p className="lh-1 fw-normal text-body-secondary mb-1">Online</p>
         </div>
      </div>
   );
}

export default MsgMainComp;
