import React, { useContext, FunctionComponent, useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import VideoPlayer from "../../components/VideoPlayer";

import { Firebase } from "../../services/Firebase";


const Video: FunctionComponent = () => {
  const [videoURL, setVideoURL] = useState("")

  let storage = Firebase.storage()
  let pathReference = storage.ref("/videos/Breaking_Kick_Step.mp4")
  console.log(`pathReference: ${pathReference}`)

  pathReference.getDownloadURL()
    .then((url) => {
      setVideoURL(url)
    })
    .catch((err) => {
      console.log(`error getting videoURL: ${err}`)
    })

  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Layout style={styles.container}>
      <VideoPlayer videoUri={videoURL}/>
    </Layout>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});