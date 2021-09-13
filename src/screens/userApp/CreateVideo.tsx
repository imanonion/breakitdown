import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

const CreateVideo: FunctionComponent = () => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Layout style={styles.container}>
      <Text>CREATE VIDEO</Text>
    </Layout>
  );
};

export default CreateVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
