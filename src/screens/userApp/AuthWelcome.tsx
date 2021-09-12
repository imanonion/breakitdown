import React, { useContext, useState } from 'react'
import { StyleSheet, Image, Animated } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import DanceWelcomeSVG from "../../../assets/dance/danceWelcomeSVG";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import { Firebase } from '../../services/Firebase';

export default function OnboardWelcome({navigation}: any) {
    const {username, setUsername} = useContext(AuthenticatedUserContext)
    const theme = useTheme()

    const navigateToAppScreens = () => {
        navigation.navigate("Dashboard")
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DanceWelcomeSVG />
            <Image style={styles.image} source={require("../../../assets/dance/danceWelcome.png")} />
            <Text style={styles.titleText}>Welcome, {username}</Text>
            <Text style={styles.captionText}>You are all set now, let's begin!</Text>
            <Button style={styles.button} onPress={navigateToAppScreens}>Go to Home</Button>

            
        </Layout>
    );
}

const styles = StyleSheet.create ({
    image: {
        width: 236,
        height: 236,
        position: 'absolute',
        top: 150
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 450,
    },
    captionText: {
        fontSize: 12,
        position: 'absolute',
        top: 485,
    },
    button: {
        position: 'absolute',
        bottom: 50,
        width: 315,
        height: 60,
        borderRadius: 35,
    }
})