import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            const clickedElement = event.target as HTMLElement;
            const isCommentedClicked = clickedElement.id === "comment";
            const isBtnComment = clickedElement.id === "btn-comment";
            const isBtnCommentEdit =
               clickedElement.classList.contains("edit-comment");
            const isBtnClose =
               clickedElement.classList.contains("btn-close") ||
               clickedElement.classList.contains("close-btn");
            const isBtnDelete = clickedElement.classList.contains("delete");
            const isTextarea = clickedElement.classList.contains("textarea");
            const isBtnSave = clickedElement.classList.contains("save");

            if (
               !isCommentedClicked &&
               !isBtnComment &&
               !isBtnCommentEdit &&
               !isBtnClose &&
               !isBtnDelete &&
               !isTextarea &&
               !isBtnSave
            )
               callback();
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
