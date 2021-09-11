import React from 'react'
import { StyleSheet, Image, Animated } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import CountdownButton from "../../components/CountdownButton";
import DanceOneSVG from "../../../assets/dance/danceOneSVG";


export default function OnboardWelcome() {
    const [isPlaying, setIsPlaying] = React.useState(true)

    const theme = useTheme()

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DanceOneSVG />
            <Image style={styles.image} source={require("../../../assets/dance/danceOne.png")} />
            <Text style={styles.titleText}>A step a day</Text>
            <Text style={styles.captionText}>Dancing is meant to be fun! Let’s take it one step at a time.</Text>
            <Layout style={styles.button}>
                <CountdownButton isPlaying={isPlaying} destination={"OnboardTwo"} />
            </Layout>
            
        </Layout>
    );
}

const styles = StyleSheet.create ({
    image: {
        width: 213,
        height: 236,
        position: 'absolute',
        top: 85
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        width: 152,
        height: 36,
        top: 470,
        left: 30
    },
    captionText: {
        fontSize: 14,
        position: 'absolute',
        width: 315,
        height: 93,
        top: 521,
        left: 30
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        top:712,
        left: 285
    },
})