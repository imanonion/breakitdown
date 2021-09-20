import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import DanceWelcomeSVG from "../../../assets/dance/danceWelcomeSVG";
import { AuthenticatedUserContext, lessonProps } from "../../navigation/AuthenticatedUserProvider";
import { Firebase } from '../../services/Firebase';
import { AppStackParamList } from "./AppStackParams";

type authWelcomeScreenProp = NativeStackNavigationProp<AppStackParamList, "AuthWelcome">

export default function AuthWelcome() {
    const {username, setUsername, setHipHopLessons, setBreakingLessons} = useContext(AuthenticatedUserContext)
    const theme = useTheme()

    const navigation = useNavigation<authWelcomeScreenProp>()

    const navigateToAppScreens = () => {
        navigation.navigate("Tabs")
    }

    useEffect(() => {
        //get lessons collection and push each lesson into lessonsArray
        Firebase.firestore().collection('lessons').get()
            .then((snapshot) => {
                const hipHopClass: lessonProps[] = []
                const breakingClass: lessonProps[] = []
                snapshot.docs.forEach((doc) => {
                    const data = doc.data() as lessonProps
                    if(data.genre === "Hip Hop") {
                        hipHopClass.push(data)
                    } else if(data.genre === "Breaking") {
                        breakingClass.push(data)
                    }
            })
            setHipHopLessons(hipHopClass)
            setBreakingLessons(breakingClass)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

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