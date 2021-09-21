import React, { useContext, FunctionComponent, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Card, List, ListItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";

import { AuthenticatedUserContext, lessonProps, stepProps } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";
import firebase from "firebase";

type Props = {
  item: {genre: string, description: string},
}

type browseScreenProp = NativeStackNavigationProp<AppStackParamList, "Browse">

const Browse = () => {
  const { user, hipHopLessons, setHipHopLessons, breakingLessons, setBreakingLessons } = useContext(AuthenticatedUserContext);
  const [hipHopCompleted, setHipHopCompleted] = useState(0)
  const [breakingCompleted, setBreakingCompleted] = useState(0)
  const navigation = useNavigation<browseScreenProp>()

  const genreList = [
    {"genre": "Hip Hop", "description": ""},
    {"genre": "Breaking", "description": ""}
  ]

  useEffect(() => {
    //get no of completed classes per genre
    Firebase.firestore().collection("users").doc(user.uid).collection("lessons").doc("completed").get()
      .then((doc) => {
        const data = doc.data()
        let noOfHipHop = 0
        let noOfBreaking = 0
        for (const property in data) {
          const genre: string = data[property].params.genre
          if (genre == "Hip Hop") {
            noOfHipHop++
          } else if (genre == "Breaking") {
            noOfBreaking++
          }
        }
        setHipHopCompleted(noOfHipHop)
        setBreakingCompleted(noOfBreaking)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  genreList[0].description = `${hipHopCompleted} out of ${hipHopLessons.length} completed`
  genreList[1].description = `${breakingCompleted} out of ${breakingLessons.length} completed`

  const renderItem = ({item}: Props) => (
    <Card status="primary" style={styles.cardStyle}>
      <Text style={styles.genreStyle}>{`${item.genre}`}</Text>
      <Text>{`${item.description}`}</Text>
      <Button style={styles.button} onPress={() => navigation.navigate("Genre", item)}>{'>'}</Button>
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
