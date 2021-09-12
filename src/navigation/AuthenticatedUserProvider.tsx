import React, { useState, createContext, FunctionComponent, ContextType } from "react";

export const AuthenticatedUserContext = createContext<any>(null!);

export const AuthenticatedUserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser, username, setUsername }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};