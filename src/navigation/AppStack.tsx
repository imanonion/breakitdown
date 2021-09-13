import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthWelcome from "../screens/userApp/AuthWelcome"
import Home from "../screens/userApp/Home";
import Browse from "../screens/userApp/Browse";
import CreateVideo from "../screens/userApp/CreateVideo";
import Profile from "../screens/userApp/Profile";
import { BottomTabNavigator } from "./BottomTabNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AuthWelcome" component={AuthWelcome} />
      <Screen name="Tabs" component={BottomTabNavigator} />
      <Screen name="Home" component={Home} />
      <Screen name="Browse" component={Browse} />
      <Screen name="Create" component={CreateVideo} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}