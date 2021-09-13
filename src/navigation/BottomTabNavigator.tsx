import React, {FunctionComponent} from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator, BottomTabNavigationProp, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Layout, Text, Divider } from "@ui-kitten/components";
import { HomeIcon, BrowseIcon, CreateVideoIcon, ProfileIcon } from "../components/Icons";

import { MainBottomTabParamList } from "../screens/MainBottomTabParams";
import Home from "../screens/userApp/Home";
import Browse from "../screens/userApp/Browse";
import CreateVideo from "../screens/userApp/CreateVideo";
import Profile from "../screens/userApp/Profile";

const { Navigator, Screen } = createBottomTabNavigator<MainBottomTabParamList>()

const BottomTabBar: FunctionComponent<BottomTabBarProps>  = ({navigation, state}) => {
    // const navigation = useNavigation()
    // const state = useNavigationState(state => state)
    // const index = state.index

    console.log(state)

    return (
        <Layout>
            <Divider />
            <BottomNavigation appearance="noIndicator" selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab title="Home" icon={HomeIcon} />
                <BottomNavigationTab title="Browse" icon={BrowseIcon} />
                <BottomNavigationTab title="Create" icon={CreateVideoIcon} />
                <BottomNavigationTab title="Profile" icon={ProfileIcon} />
            </BottomNavigation>
        </Layout>
    )
}

export const BottomTabNavigator = () => {
    return (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name="Home" component={Home} />
            <Screen name="Browse" component={Browse} />
            <Screen name="CreateVideo" component={CreateVideo} />
            <Screen name="Profile" component={Profile} />
        </Navigator>
    )
    
}