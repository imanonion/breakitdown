import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

type profileScreenProp = NativeStackNavigationProp<RootStackParamList, "App">

const Profile: FunctionComponent = () => {
  const { user } = useContext(AuthenticatedUserContext);

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
      <Text>Welcome {user.email}!</Text>
      <Button onPress={logout}>LOG OUT</Button>
      <Text>Your UID is: {user.uid}</Text>
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
});
