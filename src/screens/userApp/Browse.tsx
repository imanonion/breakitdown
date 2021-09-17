import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input, List, ListItem } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

type Props = {
  item: {genre: string},
  index: number
}

const genreList = [{"genre": "Hip Hop"}, {"genre": "Breaking"}]

// let hipHopInfo = Firebase.firestore().collection("lessons").where("genre", "==", "Hip Hop")
// console.log(hipHopInfo)

const Browse = () => {
  const { user } = useContext(AuthenticatedUserContext);

  // try {
  //   let hipHopInfo = await Firebase.firestore().collection("lessons").where("genre", "==", "Hip Hop")
  //   console.log(hipHopInfo)
  // } catch (err) {
  //   console.log(`error getting hip hop collection: ${err}`)
  // }
  

  const renderItem = ({item, index}: Props) => (
    <ListItem 
      title={`${item.genre} ${index + 1}`}
    />
  )

  return (
    <>
      <Layout>
        <Text>hey</Text>
      </Layout>
      <List 
        style={styles.listStyle}
        data={genreList}
        renderItem={renderItem}
      />
    </>

  );
};

export default Browse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    maxHeight: 180
  }
});
