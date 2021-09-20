import React, { useContext, FunctionComponent, useState } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Button, Layout, Text, Divider, Input, List, ListItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext, lessonProps, stepProps } from "../../navigation/AuthenticatedUserProvider";
import { Firebase } from "../../services/Firebase";
import firebase from "firebase"
import { convertCompilerOptionsFromJson } from "typescript";

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
  let lessons: any = []

  //get params passed from Genre page
  const { params } = route

  const navigation = useNavigation<lessonScreenProp>()

  const addLessonInProgress = async () => {
    navigation.navigate("Video", params)

    try {
      
      //check if field exists in completed document
      let checkLessonExists = false

      await Firebase.firestore().collection('users').doc(user.uid).collection('lessons')
        .doc('completed').get().then((doc) => {
          let completedDoc = doc.data()
          if (completedDoc?.hasOwnProperty(params.name)) {
            checkLessonExists = true
          }
        })

      //if field does not already exist, add lesson to inProgress document
      if (checkLessonExists == false) {
        await Firebase.firestore().collection('users').doc(user.uid).collection('lessons')
          .doc('inProgress').update({
            [params.name]: {
              params, 
              added_at: firebase.firestore.FieldValue.serverTimestamp(),
              status: "In Progress"
            }
        })
      }
      
    } catch (err) {
      console.log(`error finding completed lesson: ${err}`)
    }
  }

  const moveLessonToCompleted = async () => {
    navigation.navigate("Congrats", params)

    try {
      //add lesson to completed document
      await Firebase.firestore().collection('users').doc(user.uid).collection('lessons')
      .doc('completed').update({
        [params.name]: {
          params, 
          added_at: firebase.firestore.FieldValue.serverTimestamp(),
          status: "Completed"
        }
      })

      //remove lesson from inProgress document
      await Firebase.firestore().collection('users').doc(user.uid).collection('lessons')
      .doc('inProgress').update({
        [params.name]: firebase.firestore.FieldValue.delete()})

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


//----old code storing lesson status in arrays---------//
//lessonsInProgress
// const collection: any = {}
  // snapshot.forEach(doc => {
  //   collection[doc.id] = doc.data()
  // })

  // console.log(collection) 
  
  //if params.name does not exist in collection.keys, then add the move as a document
  
    // const userData: any = getUserDoc.data()
    // console.log(userData)
    
    // if (userData.lessons.completed) {
    //   //if lesson is neither Completed nor inProgress, then add lesson to inProgress
    //   if (! userData.lessonsCompleted.includes(params.name)) {
        // try {
        //   await Firebase
        //   .firestore()
        //   .collection("users")
        //   .doc(user.uid)
        //   .set({
        //     [`lessonsInProgress.${params.name}`] : firebase.firestore.FieldValue.serverTimestamp()
        //   }, {merge: true})
        // } catch (err) {
        //   console.log(`error adding lesson to inProgress with completed: ${err}`)
        // }
    //   }
    // } else if (! userData.lessonscompleted) {
    //   try {
    //     await Firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(user.uid)
    //     .update({
    //       lessonsInProgress: {name: params.name, updated_at: firebase.firestore.FieldValue.serverTimestamp()}
    //     })
    //   } catch (err) {
    //     console.log(`error adding lesson to inProgress: ${err}`)
    //   }
    // }

//lessonsCompleted
// await Firebase
  // .firestore()
  // .collection("users")
  // .doc(user.uid)
  // .update({
  //   lessonsInProgress: {name: params.name, updated_at: firebase.firestore.FieldValue.serverTimestamp()}
  // })

  // await Firebase
  // .firestore()
  // .collection("users")
  // .doc(user.uid)
  // .update({
  //   lessonsCompleted: {name: params.name, updated_at: firebase.firestore.FieldValue.serverTimestamp()}
  // })