import React, { useContext, FunctionComponent, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text, Card, List, ListItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";

import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";

type Props = {
  item: {genre: string, description: string},
}

type browseScreenProp = NativeStackNavigationProp<AppStackParamList, "Browse">

type stepProps = {
  title: string,
  explanation: string
}

type lessonProps = {
  "description": string,
  "duration": string,
  "genre": string,
  "name": string,
  "steps": stepProps[],
  "storageThumbnailRef": string,
  "storageVideoRef": string,
  "type": string
}

const genreList = [
  {"genre": "Hip Hop", "description": ""},
  {"genre": "Breaking", "description": ""}
]

const Browse = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [hipHopLessons, setHipHopLessons] = useState(0)
  const [breakingLessons, setBreakingLessons] = useState(0)

  //create array to store all lessons
  const lessonsArray: (lessonProps| firebase.default.firestore.DocumentData)[] = []

  //get lessons collection and push each lesson into lessonsArray
  Firebase.firestore().collection('lessons').get()
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        lessonsArray.push(doc.data())
      })
      
      //count no of each genre
      lessonsArray.forEach((lesson) => {
        if(lesson.genre === "Hip Hop") {
          return setHipHopLessons(hipHopLessons + 1)
        } else if(lesson.genre === "Breaking") {
          return setBreakingLessons(breakingLessons + 1)
        }
      })

      genreList[0].description = `1 out of ${hipHopLessons} completed`
      genreList[1].description = `1 out of ${breakingLessons} completed`
    })
    .catch((err) => {
      console.log(err)
    })
  
  const navigation = useNavigation<browseScreenProp>()
  
  const goToGenre = () => {
    navigation.navigate("Genre")
  }

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
