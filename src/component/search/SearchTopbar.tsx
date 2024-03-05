import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { TOKEN, useLocalStorage } from "../../redux/hooks/useLocalStorage";
import { SearchedUserType } from "../../pages/SearchPage";

type Props = {
   setSearchedResults: React.Dispatch<
      React.SetStateAction<SearchedUserType[] | null>
   >;
};

const SearchTopbar: React.FC<Props> = ({ setSearchedResults }) => {
   const { getItem } = useLocalStorage(TOKEN);
   const [search, setSearch] = useState("");
   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

   const fetchData = async (search: string) => {
      try {
         const response = await fetch(
            process.env.REACT_APP_BE_URL + "/users/" + search,
            {
               headers: {
                  Authorization: "Bearer " + getItem(),
               },
            }
         );

         if (response.ok) {
            const data = await response.json();
            const results: SearchedUserType[] = data.content;
            console.log("sending results: ", results);
            setSearchedResults(results);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);

      if (timeoutId) {
         clearInterval(timeoutId);
      }
      setTimeoutId(setTimeout(() => fetchData(search), 2000));
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      fetchData(search);
   };

   return (
      <div className="d-flex justify-content-between px-4 pt-3 primary-border fw-semibold bg-white">
         <Form onSubmit={handleSubmit} className="w-100">
            <InputGroup className="mb-3">
               <Form.Control
                  value={search}
                  onChange={handleInput}
                  placeholder="User search"
                  aria-label="search"
                  aria-describedby="basic-addon2"
               />
               <Button variant="outline-secondary" id="button-addon2">
                  Search
               </Button>
            </InputGroup>
         </Form>
      </div>
   );
};

export default SearchTopbar;
