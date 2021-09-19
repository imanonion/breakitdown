import React, { useContext, useState } from 'react'
import { StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import CongratsSVG from "../../../assets/dance/congratsSVG";
import { AuthenticatedUserContext, lessonProps } from "../../navigation/AuthenticatedUserProvider";
import { Firebase } from '../../services/Firebase';
import { AppStackParamList } from "./AppStackParams";

type Props = NativeStackScreenProps<AppStackParamList, "Congrats">
type congratsScreenProp = NativeStackNavigationProp<AppStackParamList, "Congrats">
type ItemProps = {
    item: lessonProps
}

export default function Congrats({route}: Props) {
    const {username, setUsername} = useContext(AuthenticatedUserContext)
    const theme = useTheme()

    const navigation = useNavigation<congratsScreenProp>()

    const {params} = route

    const navigateToAppScreens = () => {
        navigation.navigate("Tabs")
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CongratsSVG />
            <Image style={styles.image} source={require("../../../assets/dance/congrats.png")} />
            <Layout style={styles.titlePosition}>
                <Text style={styles.titleText}>Congratulations!</Text>
                <Text style={styles.titleText}>You have completed:</Text>
                <Text style={styles.lessonText}>{`${params.name}`}</Text>
            </Layout>
            <Layout style={styles.quote}>
                <Text style={styles.captionText}>Dance is the hidden language of the soul</Text>
                <Text style={styles.captionText}>- Martha Graham</Text>
            </Layout>
            <Button style={styles.button} onPress={navigateToAppScreens}>Back to Home</Button>
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
    titlePosition: {
        position: "absolute",
        top: 410,
        alignItems: "center"
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    lessonText: {
        fontSize: 32,
        fontWeight: "bold",
        fontStyle: "italic",
        marginVertical: 20
    },
    quote: {
        position: "absolute",
        top: 600,
        alignItems: "center"
    },
    captionText: {
        fontSize: 14,
        fontStyle: "italic"
    },
    button: {
        position: 'absolute',
        bottom: 50,
        width: 315,
        height: 60,
        borderRadius: 35,
    }
})