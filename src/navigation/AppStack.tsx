import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthWelcome from "../screens/userApp/AuthWelcome"
import Dashboard from "../screens/userApp/Dashboard";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AuthWelcome" component={AuthWelcome} />
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}