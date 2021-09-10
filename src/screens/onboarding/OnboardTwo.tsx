import React from 'react'
import { StyleSheet, Image, Animated } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import CountdownButton from "../../components/CountdownButton";


export default function OnboardWelcome() {
    const [isPlaying, setIsPlaying] = React.useState(true)

    const theme = useTheme()

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.image} source={require("../../../assets/dance/danceTwo.png")} />
            <Text style={styles.titleText}>Routines made easy</Text>
            <Text style={styles.captionText}>Combine moves easily to make a choreography routine you can call your own.</Text>
            <Layout style={styles.button}>
                <CountdownButton isPlaying={isPlaying} destination={"OnboardThree"} />
            </Layout>
            
        </Layout>
    );
}

const styles = StyleSheet.create ({
    image: {
        width: 251,
        height: 251,
        position: 'absolute',
        top: 155,
        left: 6
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        width: 251,
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