import { SWITCH_RECEIVER } from "../actions";

type SetReceiver = {
   type: typeof SWITCH_RECEIVER;
   payload: object;
};

type MsgAction = SetReceiver;

const initialState = {
   receiver: {
      message: "",
      name: "",
   },
};

const messageReducer = (state = initialState, action: MsgAction) => {
   switch (action.type) {
      case SWITCH_RECEIVER:
         return {
            ...state,
            receiver: action.payload,
         };
   }
};

export default messageReducer;
