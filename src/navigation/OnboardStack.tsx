import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import OnboardWelcome from "../screens/onboarding/OnboardWelcome";
import OnboardOne from "../screens/onboarding/OnboardOne";

const { Navigator, Screen } = createNativeStackNavigator()

export default function OnboardStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="OnboardWelcome" component={OnboardWelcome} />
                <Screen name="OnboardOne" component={OnboardOne} />
            </Navigator>
        </NavigationContainer>

    )
}