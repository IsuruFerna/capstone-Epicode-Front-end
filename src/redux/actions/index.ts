import { ReduxReceiver } from "../../component/message/MsgReceiver";

export const SWITCH_RECEIVER = "SWITCH_RECEIVER";

export const switchReceiver = (reciever: ReduxReceiver) => {
   return {
      type: SWITCH_RECEIVER,
      payload: reciever,
   };
};
