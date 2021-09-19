import React, { useContext, FunctionComponent } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Button, Layout, Text, Divider, Input, List, ListItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext, lessonProps, stepProps } from "../../navigation/AuthenticatedUserProvider";
import { Firebase } from "../../services/Firebase";
import firebase from "firebase"

type Props = NativeStackScreenProps<AppStackParamList, "Lesson">
type lessonScreenProp = NativeStackNavigationProp<AppStackParamList, "Lesson">
type ItemProps = {
  item: stepProps,
  index: number
}

type userProps = {
  email: string,
  lessonsCompleted?: string[],
  lessonsInProgress?: string[],
  username?: string
}

const {width, height} = Dimensions.get("window")

const Lesson = ({route}: Props) => {
  const { user } = useContext(AuthenticatedUserContext);

  //get params passed from Genre page
  const { params } = route

  const navigation = useNavigation<lessonScreenProp>()

  const addLessonInProgress = async () => {
    navigation.navigate("Video", params)

    try {
      const getUserDoc = await Firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
      
        const userData: any = getUserDoc.data()
        
        //if lesson is neither Completed nor inProgress, then add lesson to inProgress
        if (! userData.lessonsCompleted.includes(params.name)) {
          try {
            await Firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              lessonsInProgress: firebase.firestore.FieldValue.arrayUnion(params.name)
            })
          } catch (err) {
            console.log(`error adding lesson to inProgress: ${err}`)
          }
        }
    } catch (err) {
      console.log(`error finding completed lesson: ${err}`)
    }
  }

  const moveLessonToCompleted = async () => {
    navigation.navigate("Congrats", params)

    try {
      await Firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        lessonsInProgress: firebase.firestore.FieldValue.arrayRemove(params.name)
      })

      await Firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        lessonsCompleted: firebase.firestore.FieldValue.arrayUnion(params.name)
      })
    } catch (err) {
      console.log(`error adding lesson to inProgress: ${err}`)
    }
  }

  const renderSteps = ({item, index}: ItemProps) => (
    <ListItem 
      title={`${index + 1}. ${item.title}`}
      description={item.explanation}
    />
  )

  return (
    <>
      <Layout style={styles.videoScreen}>
        <Button style={styles.button} onPress={addLessonInProgress}>{`Start     > Lesson`}</Button>
      </Layout>
      <Layout style={styles.infoScreen}>
        <Layout>
          <Layout style={styles.layoutStyle}>
            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.description}>{`${params.type}: ${params.genre}`}</Text>
          </Layout>
          <Layout style={styles.layoutStyle}>
            <Text style={styles.title}>Description</Text>
            <Text >{params.description}</Text>
          </Layout>
          <Layout style={[styles.layoutStyle, {flexDirection: "row"}]}>
            <Text style={styles.title}>How To Do It</Text>
            <Text style={{left: width*0.57}}>{`${params.steps.length} Steps`}</Text>
          </Layout>
          <List 
            data={params.steps}
            renderItem={renderSteps}
          />
          <Button style={styles.completeButton} onPress={moveLessonToCompleted}>Mark Lesson as Complete</Button>
        </Layout>
      </Layout>
    </>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoScreen: { 
    backgroundColor: "olive",
    height: height * 0.2 + 32,
    justifyContent: 'center',
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 48,
    alignSelf: "flex-end",

    borderRadius: 50
  },
  infoScreen: {
    position: "absolute",
    height: height * 0.6 + 82,
    transform: [{translateY: height * 0.2}],
    borderRadius: 32,
    padding: 5,
    paddingTop: 15,
    alignItems: "center"
  },
  layoutStyle: {
    marginVertical: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 18
  },
  description: {
    fontSize: 14
  },
  completeButton: {
    alignSelf: "center",
    bottom: 5,
    width: 315,
    height: 60,
    borderRadius: 35,
  },
});
