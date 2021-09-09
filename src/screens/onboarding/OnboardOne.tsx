import React from 'react'
import { StyleSheet, Image } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";

export default function OnboardWelcome() {
    const theme = useTheme()

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require("../../../assets/dance/dancer (2).png")} />
            <Layout style={styles.logo}>
                <Text style={styles.logoText}>break</Text>
                <Text style={[styles.logoText, {color: theme['color-primary-default']}]}>it</Text>
                <Text style={styles.logoText}>down</Text>
            </Layout>
            <Text style={styles.captionText}>Find your rhythm</Text>
            <Button style={styles.button}>Get Started</Button>
        </Layout>
    );
}

const styles = StyleSheet.create ({
    logo: {
        flexDirection: "row",
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    captionText: {
        fontSize: 18
    },
    button: {
        position: 'absolute',
        bottom: 50,
        width: 315,
        height: 60,
        borderRadius: 35,
    }
})
