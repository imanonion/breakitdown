import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, ImageSourcePropType, Dimensions } from "react-native";
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
  const { genre, description } = route.params
 
  const navigation = useNavigation<genreScreenProp>()

  // const getThumbnailURL = (urlRef: string) => {
  //   let storage = Firebase.storage()
  //   let pathReference = storage.ref(urlRef)
  //   console.log(pathReference)

  //   pathReference.getDownloadURL()
  //     .then((url) => {
  //       setThumbnailURL(url)
  //     })
  //     .catch((err) => {
  //       console.log(`error getting thumbnail: ${err}`)
  //     })

  //   return thumbnailURL
  // }

  useEffect(() => {
    if (genre === "Hip Hop") {
      setLesson(hipHopLessons)
    } else if (genre === "Breaking") {
      setLesson(breakingLessons)
    }
  }, [])

  const renderItem = ({item}: ItemProps) => (
    <Card status="primary" style={styles.cardStyle}>
      {/* <Image source={{uri: getThumbnailURL(item.storageThumbnailRef)}} /> */}
      <Button style={styles.button} onPress={() => navigation.navigate("Lesson", item)}>{'>'}</Button>
      <Layout style={styles.title}>
        <Text style={styles.genreStyle}>{`${item.name}`}</Text>
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
    
  },
  cardStyle: {
    marginBottom: 5,
    width: width,
    height: height * 0.18
  },
  genreStyle: {
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
    flexDirection: "row"
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

