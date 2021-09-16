import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input, useTheme } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

type homeScreenProp = NativeStackNavigationProp<AppStackParamList, "Home">

const Home: FunctionComponent = () => {
  const { user, username } = useContext(AuthenticatedUserContext);
  const theme = useTheme()

  const navigation = useNavigation<homeScreenProp>()
  
  const goToVideo = () => {
    navigation.navigate("Video")
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.logo}>
        <Text style={styles.logoText}>break</Text>
        <Text style={[styles.logoText, {color: theme['color-primary-default']}]}>it</Text>
        <Text style={styles.logoText}>down</Text>
      </Layout>
      <Layout style={styles.welcome}>
        <Text style={{fontSize: 12}}>Welcome Back,</Text> 
        <Text style={{fontWeight: "bold", fontSize: 20}}>{username}</Text>
      </Layout>
      {/* <Text>Your UID is: {user.uid}</Text> */}

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
  logo: {
    flexDirection: "row",
    position: 'absolute',
    top: 5,
    left: 10
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  welcome: {
    position: 'absolute',
    top: 10,
    left: 10
  }
});
