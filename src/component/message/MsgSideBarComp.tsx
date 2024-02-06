import { House, PersonCircle, PlusLg } from "react-bootstrap-icons";
import MsgBarSearch from "./MsgBarSearch";
import MsgReceiver from "./MsgReceiver";
import { useState } from "react";

function MsgSideBarComp() {
   const person = {
      name: "Alice",
      message: "message",
   };

   const [state, setState] = useState(true);

   return (
      <>
         <div className="d-flex w-100 h-100 justify-content-start">
            <div className="msg-leftbar-dark h-100">
               <div className="w-10 pt-2 pb-3 px-2 d-flex flex-column justify-content-between h-100 w-100">
                  <div>
                     <House className="rounded fs-2 p-2 bg-icon-primary" />
                  </div>
                  <div className="d-flex flex-column">
                     <PlusLg className="rounded fs-2 p-2 mb-2 bg-icon-primary" />
                     <PersonCircle className="rounded fs-2 p-2 bg-icon-primary" />
                  </div>
               </div>
            </div>
            <div className="w-90 p-2">
               <MsgBarSearch />

               <MsgReceiver person={person} state={state} />
               <MsgReceiver person={person} state={state} />
               <MsgReceiver person={person} state={false} />
            </div>
         </div>
      </>
   );
}

export default MsgSideBarComp;
