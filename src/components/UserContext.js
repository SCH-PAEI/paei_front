import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};
