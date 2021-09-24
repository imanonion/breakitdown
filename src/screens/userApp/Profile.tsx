import React, { useContext, FunctionComponent } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

const { width, height } = Dimensions.get("screen")

type profileScreenProp = NativeStackNavigationProp<RootStackParamList, "App">

const Profile: FunctionComponent = () => {
  const { user, username } = useContext(AuthenticatedUserContext);

  const navigation = useNavigation<profileScreenProp>()

  const redirectToLogin = () => {
    navigation.navigate("Auth")
  }

  const logout = async () => {
    try {
      await Firebase.auth().signOut();
      redirectToLogin()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text style={styles.usernameStyle}>{username}</Text>
      <Button style={styles.logoutStyle} onPress={logout}>LOG OUT</Button>
      <Text style={styles.emailStyle}>Email: {user.email}</Text>
      <Layout style={styles.creditsLayout}>
        <Text style={styles.creditStyle}>Credits:</Text>
        <Text style={{fontSize: 12}}>AIST Dance Video Database
        @ https://aistdancedb.ongaaccel.jp</Text>
      </Layout>
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameStyle: {
    position: "absolute",
    alignSelf: "flex-start",
    top: 10,
    left: 10,
    fontWeight: "bold",
    fontSize: 32
  },
  logoutStyle: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 10,
    right: 10
  },
  emailStyle: {
    position: "absolute",
    alignSelf: "flex-start",
    left: 10,
    top: 60
  },
  creditsLayout: {
    position: "absolute",
    bottom: 10,
  },
  creditStyle: {
    fontWeight: "bold",
    fontSize: 12
  }
});
