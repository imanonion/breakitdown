import React from "react"
import { Button, Text, Layout } from "@ui-kitten/components";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";

const { width, height } = Dimensions.get("window")

type urlProp = {
    videoUri: string
}

export default function VideoPlayer({videoUri}: {videoUri: string}) {
    const navigation = useNavigation()
    console.log(`in video player: ${videoUri}`)

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <Layout style={styles.container}>
            <Button onPress={goBack}>Back to Home</Button>
            <Video
                source={{
                uri: videoUri,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                useNativeControls
                style={styles.video}
            />
        </Layout>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    video: {
      width: width,
      height: height/1.5,
    },
  });