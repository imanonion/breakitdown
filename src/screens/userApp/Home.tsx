import React, { useContext, FunctionComponent, useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Layout, Text, Divider, Input, useTheme, Card, List } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext, lessonProps } from "../../navigation/AuthenticatedUserProvider";

import { Firebase } from "../../services/Firebase";
import _ from "lodash"

type homeScreenProp = NativeStackNavigationProp<AppStackParamList, "Home">

type activitiesType = {
  added_at: {nanoseconds: number, seconds: number},
  params: lessonProps,
  status: string
}

type Props = {
  item: activitiesType
}

const {width, height} = Dimensions.get("screen")

const Home: FunctionComponent = () => {
  const { user, username } = useContext(AuthenticatedUserContext);
  const [activities, setActivities] = useState([] as activitiesType[])
  const theme = useTheme()

  const navigation = useNavigation<homeScreenProp>()

  //get lessons collection
  useEffect(() => {
    Firebase.firestore().collection("users").doc(user.uid).collection("lessons").get()
      .then((snapshot) => {
        let getActivities: activitiesType[] = []
        snapshot.docs.forEach((doc) => {
          const data = doc.data() as {[key:string]: activitiesType}
          const getValues = Object.values(data)
          const concatArray = getActivities.concat(getValues)
          getActivities = concatArray
        })
        const sortActivities = _.orderBy(getActivities, ["added_at"], ["desc"])
        const latestActivities = sortActivities.slice(0, 3)
        setActivities(latestActivities)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const renderItem = ({item}: Props) => (
    <Card status="basic" style={styles.cardStyle}>
      <Layout style={{flexDirection: "row"}}>
        <Layout>
          <Text style={styles.genreStyle}>{item.params.name}</Text>
          <Text>{`${item.params.type}: ${item.params.genre}`}</Text>
          <Text>{item.status}</Text>
        </Layout>
        <Button style={styles.button} onPress={() => navigation.navigate("Lesson", item.params)}>{'>'}</Button>
      </Layout>
    </Card>
  )

  return (
    <Layout style={styles.container}>
      <Layout style={styles.logo}>
        <Text style={styles.logoText}>break</Text>
        <Text style={[styles.logoText, {color: theme['color-primary-default']}]}>it</Text>
        <Text style={styles.logoText}>down</Text>
      </Layout>
      <Layout style={styles.welcome}>
        <Text style={{fontSize: 18}}>Keep Dancing,</Text> 
        <Text style={{fontWeight: "bold", fontSize: 32}}>{username}</Text>
      </Layout>
      <Layout style={[styles.title, {backgroundColor: theme['color-primary-default']}]}>
        <Text style={styles.titleTextStyle}>Latest Activities</Text>
      </Layout>
      <Layout style={styles.cardLayout}>
        <List
          data={activities}
          renderItem={renderItem}
        />
      </Layout>

    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    position: 'absolute',
    top: 1,
    right: 3,
    alignSelf: "flex-end"
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  welcome: {
    position: 'absolute',
    top: 3,
    left: 10
  },
  title: {
    position: "absolute",
    top: 100,
    width: width
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  cardLayout: {
    position: "absolute",
    top: 133, 
    width: width
  },
  cardStyle: {
    width: width
  },
  genreStyle: {
    fontWeight: "bold",
    fontSize: 20
  },
  button: {
    width:48,
    height: 48,
    alignSelf: "center",
    position: "absolute",
    right: 10,
    borderRadius: 50,
  }
});
