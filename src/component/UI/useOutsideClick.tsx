import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            const clickedElement = event.target as HTMLElement;
            const isCommentedClicked = clickedElement.id === "comment";
            const isBtnComment = clickedElement.id === "btn-comment";

            if (!isCommentedClicked && !isBtnComment) callback();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [callback]);
   return ref;
};

export default useOutsideClick;
