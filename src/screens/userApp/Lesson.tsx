import React, { useContext, FunctionComponent } from "react";
import { StyleSheet, Dimensions, Alert, ScrollView, View } from "react-native";
import { Button, Layout, Text, Divider, Input, List, ListItem } from "@ui-kitten/components";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppStackParams";
import { AuthenticatedUserContext, lessonProps, stepProps } from "../../navigation/AuthenticatedUserProvider";
import * as Animatable from "react-native-animatable"
import { Firebase } from "../../services/Firebase";

type Props = NativeStackScreenProps<AppStackParamList, "Lesson">
type lessonScreenProp = NativeStackNavigationProp<AppStackParamList, "Genre">
type ItemProps = {
  item: stepProps,
  index: number
}

const {width, height} = Dimensions.get("window")

const interval = 400

const Lesson = ({route}: Props) => {
  const { user } = useContext(AuthenticatedUserContext);

  //get params passed from Genre page
  const item = route.params

  const renderSteps = ({item, index}: ItemProps) => (
    <ListItem 
      title={`${index + 1}. ${item.title}`}
      description={item.explanation}
    />
  )

  return (
    <>
      <Layout style={styles.videoScreen}/>
      <Layout style={styles.infoScreen}>
          <Text>{item.name}</Text>
          <Text>{`${item.type}: ${item.genre}`}</Text>
          <Text>Description</Text>
          <Text>{item.description}</Text>
          <Layout style={{flexDirection: "row"}}>
            <Text>How To Do It</Text>
            <Text style={{left: width*0.6}}>{`${item.steps.length} Steps`}</Text>
          </Layout>
          <List 
            data={item.steps}
            renderItem={renderSteps}
          />
          <Button style={styles.completeButton} onPress={() => Alert.alert("Lesson completed!")}>Mark Lesson as compete</Button>
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
    height: height * 0.2 + 32
  },
  infoScreen: {
    position: "absolute",
    height: height * 0.6 + 82,
    transform: [{translateY: height * 0.2}],
    borderRadius: 32,
    padding: 5,
    paddingTop: 32 + 10,
  },
  completeButton: {
    alignSelf: "center",
    bottom: 20,
    width: 315,
    height: 60,
    borderRadius: 35,
}
  
});
