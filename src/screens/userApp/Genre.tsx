import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, ImageSourcePropType, Dimensions, ImageBackground } from "react-native";
import { Button, Layout, Text, Divider, Input, Card, List } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthenticatedUserContext, lessonProps, stepProps } from "../../navigation/AuthenticatedUserProvider";
import { AppStackParamList } from "./AppStackParams";

import { Firebase } from "../../services/Firebase";

type Props = NativeStackScreenProps<AppStackParamList, "Genre">
type genreScreenProp = NativeStackNavigationProp<AppStackParamList, "Genre">
type ItemProps = {
  item: lessonProps
}

const {width, height} = Dimensions.get("window")

const Genre = ({route}: Props) => {
  const { user, hipHopLessons, setHipHopLessons, breakingLessons, setBreakingLessons } = useContext(AuthenticatedUserContext);
  const [lesson, setLesson] = useState([])
  const [thumbnailURL, setThumbnailURL] = useState("")

  //get params passed from Browse page
  const { genre } = route.params
 
  const navigation = useNavigation<genreScreenProp>()

  useEffect(() => {
    if (genre === "Hip Hop") {
      setLesson(hipHopLessons)
    } else if (genre === "Breaking") {
      setLesson(breakingLessons)
    }
  }, [])

  const renderItem = ({item}: ItemProps) => (
    <Card status="primary" style={styles.cardStyle}>
      <Layout>
        <ImageBackground source={{uri: item.storageThumbnailRef}} resizeMode="stretch" style={{height: height*0.2, justifyContent: "center"}}>
          <Button style={styles.button} onPress={() => navigation.navigate("Lesson", item)}>{'>'}</Button>
        </ImageBackground>
      </Layout>
      <Layout style={styles.title}>
        <Text style={styles.nameStyle}>{`${item.name}`}</Text>
        <Text style={styles.duration}>{`${item.duration}`}</Text>
      </Layout>
      <Text style={{fontSize: 14}}>{`${item.type}`}</Text>
    </Card>
  )

  return (
    <Layout style={styles.container}>
      <List 
        style={styles.listStyle}
        data={lesson}
        renderItem={renderItem}
      />
      <Layout style={styles.infoScreen}>
      </Layout>
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
  listStyle: {
    width: width,
  },
  cardStyle: {
    marginBottom: 5,
    width: width,
    height: height * 0.3
  },
  nameStyle: {
    fontWeight: "bold",
    fontSize: 16
  },
  button: {
    width:48,
    height: 48,
    alignSelf: "center",
    borderRadius: 50
  },
  title: {
    flexDirection: "row",
    marginTop: 5
  },
  duration: {
    alignSelf: "flex-end",
    marginLeft: width * 0.5
  },
  infoScreen: {
    position: "absolute",
    width,
    height,
    backgroundColor: "red",
    transform: [{translateY: height}],
    borderRadius: 32
  }
});

//Code to get the downloadURLs of thumbnails, then use the firestore urls directly
// useEffect(() => {
//   Firebase.firestore().collection("lessons").get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       const data = doc.data()
//       getThumbnailURL(data.storageThumbnailRef)
//     })
//   })
//   .catch((err) => {
//     console.log(`err in genre: ${err}`)
//   })
// }, [])



// const getThumbnailURL = (urlRef: string) => {
//   let storage = Firebase.storage()
//   let pathReference = storage.ref(urlRef)
//   console.log(pathReference)

//   pathReference.getDownloadURL()
//     .then((url) => {
//       console.log(url)
//     })
//     .catch((err) => {
//       console.log(`error getting thumbnail: ${err}`)
//     })
// }