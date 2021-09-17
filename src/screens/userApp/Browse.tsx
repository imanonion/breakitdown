import React, { useContext, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Card, List, ListItem } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

type Props = {
  item: {genre: string, description: string},
}

const genreList = [
  {"genre": "Hip Hop", "description": "1 out of 2 completed"},
  {"genre": "Breaking", "description": "1 out of 2 completed"}
]

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
  

  const renderItem = ({item}: Props) => (
    <Card status="primary" style={styles.cardStyle}>
      <Text style={styles.genreStyle}>{`${item.genre}`}</Text>
      <Text>{`${item.description}`}</Text>
      <Button style={styles.button}>{'>'}</Button>
    </Card>
  )

  return (
    <>
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
    
  },
  cardStyle: {
    marginBottom: 5
  },
  genreStyle: {
    fontWeight: "bold",
    fontSize: 20
  },
  button: {
    width:48,
    height: 48,
    alignSelf: "flex-end",
    borderRadius: 50,

  }
});
