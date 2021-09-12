import React, { useState, createContext, FunctionComponent, ContextType } from "react";

export const AuthenticatedUserContext = createContext<any>(null!);

export const AuthenticatedUserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};