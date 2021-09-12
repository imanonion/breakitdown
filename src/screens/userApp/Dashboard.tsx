import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../RootStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

const Intro: FunctionComponent = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const logout = async () => {
    try {
      await Firebase.auth().signOut();
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

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
