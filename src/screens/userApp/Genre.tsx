import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import { AppStackParamList } from "../userApp/AppStackParams";

import { Firebase } from "../../services/Firebase";

type Props = NativeStackScreenProps<AppStackParamList, "Genre">

const Genre = ({route}: Props) => {
  const { genre, description } = route.params
  console.log(genre)
  console.log(description)
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Layout style={styles.container}>
      <Text>GENRE</Text>
    </Layout>
  );
};

export default Genre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
