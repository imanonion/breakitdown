import React, { useContext, FunctionComponent, useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import VideoPlayer from "../../components/VideoPlayer";

import { Firebase } from "../../services/Firebase";

type Props = NativeStackScreenProps<AppStackParamList, "Video">

function Video({ route }: Props) {
  const { user } = useContext(AuthenticatedUserContext);
  const [videoURL, setVideoURL] = useState("");

  const {params} = route
  console.log(params)

  let storage = Firebase.storage();
  let pathReference = storage.ref(params.storageVideoRef);
  console.log(`pathReference: ${pathReference}`);

  pathReference.getDownloadURL()
    .then((url) => {
      setVideoURL(url);
    })
    .catch((err) => {
      console.log(`error getting videoURL: ${err}`);
    });

  return (
    <Layout style={styles.container}>
      <VideoPlayer videoUri={videoURL} />
    </Layout>
  );
}

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});