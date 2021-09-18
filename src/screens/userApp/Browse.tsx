import React, { useContext, FunctionComponent, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Card, List, ListItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";

import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";
import firebase from "firebase";

type Props = {
  item: {genre: string, description: string},
}

type browseScreenProp = NativeStackNavigationProp<AppStackParamList, "Browse">

type stepProps = {
  title: string,
  explanation: string
}

type lessonProps  = {
  "description": string,
  "duration": string,
  "genre": string,
  "name": string,
  "steps": stepProps[],
  "storageThumbnailRef": string,
  "storageVideoRef": string,
  "type": string
} & firebase.firestore.DocumentData

const Browse = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [hipHopLessons, setHipHopLessons] = useState([] as lessonProps[])
  const [breakingLessons, setBreakingLessons] = useState([] as lessonProps[])

  const navigation = useNavigation<browseScreenProp>()
  
  const goToGenre = () => {
    navigation.navigate("Genre")
  }

  const genreList = [
    {"genre": "Hip Hop", "description": ""},
    {"genre": "Breaking", "description": ""}
  ]

  useEffect(() => {
    //get lessons collection and push each lesson into lessonsArray
    Firebase.firestore().collection('lessons').get()
    .then((snapshot) => {
      const hipHopClass: lessonProps[] = []
      const breakingClass: lessonProps[] = []
      snapshot.docs.forEach((doc) => {
        const data = doc.data() as lessonProps
          if(data.genre === "Hip Hop") {
            hipHopClass.push(data)
          } else if(data.genre === "Breaking") {
            breakingClass.push(data)
          }
      })
      setHipHopLessons(hipHopClass)
      setBreakingLessons(breakingClass)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  

  genreList[0].description = `1 out of ${hipHopLessons.length} completed`
  genreList[1].description = `1 out of ${breakingLessons.length} completed`

  const renderItem = ({item}: Props) => (
    <Card status="primary" style={styles.cardStyle}>
      <Text style={styles.genreStyle}>{`${item.genre}`}</Text>
      <Text>{`${item.description}`}</Text>
      <Button style={styles.button} onPress={goToGenre}>{'>'}</Button>
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
