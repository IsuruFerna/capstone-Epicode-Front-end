export const SWITCH_RECEIVER = "SWITCH_RECEIVER";

export const switchReceiver = (reciever: object) => {
   return {
      type: SWITCH_RECEIVER,
      payload: reciever,
   };
};
