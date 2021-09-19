import React, {useContext} from 'react'
import { StyleSheet, Image, Animated } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import CountdownButton from "../../components/CountdownButton";
import DanceThreeSVG from "../../../assets/dance/danceThreeSVG";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParams";
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

type onboardThreeScreenProp = NativeStackNavigationProp<RootStackParamList, "Onboard">

export default function OnboardThree() {
    const {user, setUser} = useContext(AuthenticatedUserContext);
    const [isPlaying, setIsPlaying] = React.useState(true)

    const navigation = useNavigation<onboardThreeScreenProp>()

    const navigateToAppOrAuth = () => {
        console.log(`onboard three: ${user}`)
        user ? navigation.navigate("App") : navigation.navigate("Auth")
    }

    const theme = useTheme()

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DanceThreeSVG />
            <Image style={styles.image} source={require("../../../assets/dance/danceThree.png")} />
            <Text style={styles.titleText}>Track your goals</Text>
            <Text style={styles.captionText}>Tell us your goals so we can help you achieve them.</Text>
            <Layout style={styles.button}>
                <CountdownButton isPlaying={isPlaying} redirect={navigateToAppOrAuth} />
            </Layout>
            
        </Layout>
    );
}

const styles = StyleSheet.create ({
    image: {
        width: 236,
        height: 236,
        position: 'absolute',
        top: 193,
        left: 139
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        width: 206,
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
