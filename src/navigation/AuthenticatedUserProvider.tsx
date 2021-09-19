import React, { useState, createContext, FunctionComponent, ContextType } from "react";
import firebase from "firebase";
import { ImageSourcePropType } from "react-native";
export const AuthenticatedUserContext = createContext<any>(null!);

export type stepProps = {
  title: string,
  explanation: string
}

export type lessonProps  = {
  "description": string,
  "duration": string,
  "genre": string,
  "name": string,
  "steps": stepProps[],
  "storageThumbnailRef": string,
  "storageVideoRef": string,
  "type": string
} & firebase.firestore.DocumentData

export const AuthenticatedUserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")
  const [hipHopLessons, setHipHopLessons] = useState([] as lessonProps[])
  const [breakingLessons, setBreakingLessons] = useState([] as lessonProps[])

  return (
    <AuthenticatedUserContext.Provider value={{ 
      user, setUser,
      username, setUsername,
      hipHopLessons, setHipHopLessons,
      breakingLessons, setBreakingLessons,
    }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};