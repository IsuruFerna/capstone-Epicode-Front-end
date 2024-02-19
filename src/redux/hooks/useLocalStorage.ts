export const TOKEN = "tokenNetwork";
export const USER = "userNetwork";

export type SaveUserType = {
   firstName: string;
   lastName: string;
   id: string;
   profilePicture: string;
   username: string;
};

export const useLocalStorage = (key: string) => {
   const setItem = (value: unknown) => {
      try {
         window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
         console.log(error);
      }
   };

   const getItem = () => {
      try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : undefined;
      } catch (error) {
         console.log(error);
      }
   };

   const removeItem = () => {
      try {
         window.localStorage.removeItem(key);
      } catch (error) {
         console.log(error);
      }
   };

   return { setItem, getItem, removeItem };
};
