import { House, PersonCircle, PlusLg } from "react-bootstrap-icons";
import MsgBarSearch from "./MsgBarSearch";
import MsgReceiver from "./MsgReceiver";
import { useState } from "react";
import { Link } from "react-router-dom";
import { USER, useLocalStorage } from "../../redux/hooks/useLocalStorage";

function MsgSideBarComp() {
   const person = {
      name: "Alice",
      message: "message",
   };
   const group = {
      name: "Group A",
      message: "message",
   };

   const { getItem: getUser } = useLocalStorage(USER);

   return (
      <>
         <div className="d-flex w-100 h-100 justify-content-start">
            <div className="msg-leftbar-dark h-100">
               <div className="w-10 pt-2 pb-3 px-2 d-flex flex-column justify-content-between h-100 w-100">
                  <div>
                     <Link to="/" className="bg-icon-primary-link">
                        <House className="rounded fs-2 p-2 bg-icon-primary" />
                     </Link>
                  </div>
                  <div className="d-flex flex-column">
                     <Link to="" className="bg-icon-primary-link">
                        <PlusLg className="rounded fs-2 p-2 mb-2 bg-icon-primary" />
                     </Link>
                     <Link
                        to={"/user/" + getUser()?.username}
                        className="bg-icon-primary-link"
                     >
                        <PersonCircle className="rounded fs-2 p-2 bg-icon-primary" />
                     </Link>
                  </div>
               </div>
            </div>
            <div className="w-90 p-2">
               <MsgBarSearch />

               <MsgReceiver person={group} state={true} />
               <MsgReceiver person={person} state={false} />
               <MsgReceiver person={person} state={false} />
               <MsgReceiver person={person} state={false} />
            </div>
         </div>
      </>
   );
}

export default MsgSideBarComp;
