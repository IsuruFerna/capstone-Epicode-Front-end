import { ReduxReceiver } from "../../component/message/MsgReceiver";
import { SWITCH_RECEIVER } from "../actions";

type SetReceiver = {
   type: typeof SWITCH_RECEIVER;
   payload: ReduxReceiver;
};

type MsgAction = SetReceiver;

const initialState = {
   receiver: {
      message: "",
      name: "",
      image: "",
   },
};

const messageReducer = (state = initialState, action: MsgAction) => {
   switch (action.type) {
      case SWITCH_RECEIVER:
         return {
            ...state,
            receiver: action.payload,
         };

      default:
         return state;
   }
};

export default messageReducer;
