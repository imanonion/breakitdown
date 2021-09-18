import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthWelcome from "../screens/userApp/AuthWelcome"
import Home from "../screens/userApp/Home";
import Browse from "../screens/userApp/Browse";
import CreateVideo from "../screens/userApp/CreateVideo";
import Profile from "../screens/userApp/Profile";
import Video from "../screens/userApp/VideoScreen";
import Genre from "../screens/userApp/Genre";
import Lesson from "../screens/userApp/Lesson";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { AppStackParamList } from "../screens/userApp/AppStackParams";

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AuthWelcome" component={AuthWelcome} />
      <Screen name="Tabs" component={BottomTabNavigator} />
      <Screen name="Home" component={Home} />
      <Screen name="Browse" component={Browse} />
      <Screen name="Create" component={CreateVideo} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Video" component={Video} />
      <Screen name="Genre" component={Genre} initialParams={{}} options={{headerShown: true}}/>
      <Screen name="Lesson" component={Lesson} options={{headerShown: true}}/>
    </Navigator>
  );
}