import { React, createContext, useState } from "react";

const Searchcontext = createContext();
export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <Searchcontext.Provider value={{ search, setSearch }}>
      {children}
    </Searchcontext.Provider>
  );
};

export default Searchcontext;
