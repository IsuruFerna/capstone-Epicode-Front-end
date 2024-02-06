import { Image } from "react-bootstrap";

type PersonProp = {
   person: {
      name: string;
      message: string;
   };
   state: boolean;
};

function MsgReceiver(props: PersonProp) {
   return (
      <div
         className={`d-flex align-items-center p-2 mb-1 rounded ${
            props.state ? "bg-msg-receiver-selected " : "bg-msg-receiver"
         }`}
      >
         <Image
            src="https://placekitten.com/50"
            className="me-3"
            roundedCircle
         />
         <div>
            <h5 className="mb-0">{props.person.name}</h5>
            <p className="mb-0 lh-1 fw-lighter text-body-secondary">
               {props.person.message}
            </p>
         </div>
      </div>
   );
}

export default MsgReceiver;
