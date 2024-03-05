import { Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { switchReceiver } from "../../redux/actions/posts_action";

// type PersonProp = {
//    person: ReduxReceiver,
//    state: boolean,
// };

// export interface ReduxReceiver {
//    username: string;
//    message: string;
//    image: string;
//    id: string;
//    firstName: string;
//    lastName: string;
// }

const MsgReceiver = ({ person }) => {
   const dispatch = useDispatch();
   const image = "https://placedog.net/50/50";

   //  store receiver data in the redux store
   const handleClick = () => {
      const sendReceiver = {
         username: person.firstName,
         message: person.message,
         profilePicture: person.profilePicture,
         id: person.id,
         firstName: person.firstName,
         lastName: person.lastName,
      };
      dispatch(switchReceiver(sendReceiver));
   };

   return (
      <div
         onClick={handleClick}
         className={`d-flex align-items-center p-2 mb-1 rounded pointer ${
            person.state ? "bg-msg-receiver-selected " : "bg-msg-receiver"
         }`}
      >
         <Image src={image} className="me-3" roundedCircle />
         <div>
            <h5 className="mb-0">{person.firstName + " " + person.lastName}</h5>
            <p className="mb-0 lh-1 fw-lighter text-body-secondary">
               {person.message}
            </p>
         </div>
      </div>
   );
};

export default MsgReceiver;
