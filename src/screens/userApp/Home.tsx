import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

type homeScreenProp = NativeStackNavigationProp<AppStackParamList, "Home">

const Home: FunctionComponent = () => {
  const { user } = useContext(AuthenticatedUserContext);

  const navigation = useNavigation<homeScreenProp>()
  
  const goToVideo = () => {
    navigation.navigate("Video")
  }

  return (
    <Layout style={styles.container}>
      <Text>Welcome {user.email}!</Text>
      <Text>Your UID is: {user.uid}</Text>

      <Button onPress={goToVideo}>Go to video</Button>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
