import { Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { switchReceiver } from "../../redux/actions/posts";

type PersonProp = {
   person: {
      name: string;
      message: string;
   };
   state: boolean;
};

export type ReduxReceiver = {
   name: string;
   message: string;
   image: string;
};

export type ReduxRootState = {
   receiver: {
      receiver: ReduxReceiver;
   };
};

function MsgReceiver(props: PersonProp) {
   const dispatch = useDispatch();
   const image = "https://placedog.net/50/50";

   //  store receiver data in the redux store
   const handleClick = () => {
      const sendReceiver = {
         name: props.person.name,
         message: props.person.message,
         image: image,
      };
      dispatch(switchReceiver(sendReceiver));
   };

   return (
      <div
         onClick={handleClick}
         className={`d-flex align-items-center p-2 mb-1 rounded ${
            props.state ? "bg-msg-receiver-selected " : "bg-msg-receiver"
         }`}
      >
         <Image src={image} className="me-3" roundedCircle />
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
