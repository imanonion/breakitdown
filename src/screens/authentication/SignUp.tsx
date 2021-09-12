import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ErrorMessage from "../../components/ErrorMessage";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";


import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../RootStackParamsList";

import firebase from "firebase";

//type checking for Register screen
type RegisterScreenProp = NativeStackScreenProps<
  RootStackParamsList,
  "SignUp"
>;

export default function SignUp({ navigation }: RegisterScreenProp) {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");

  const registerUser = async () => {
    try {
      if (email && password) {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              username,
              email,
              "lessons": {
                "completed": {},
                "inProgress": {}
              }
            });
        }
      }
    } catch (err) {
      console.log(err.message)
      setRegisterError(err.message);
    }
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.title}>
        <Text>Hey there,</Text>
        <Text style={styles.boldTitle}>Create an account</Text>
      </Layout>
      <Layout style={styles.inputLayout}>
        <Input style={styles.input} placeholder="Username" onChangeText={(text) => setUsername(text)} />
        <Input style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        <Input
          style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}
        />
      </Layout>

      {registerError ? (
        <ErrorMessage error={registerError} visible={true} />
      ) : null}

      <Button style={styles.button} onPress={registerUser}>Register</Button>
      <Layout style={styles.loginMessage}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={styles.loginText}>
            Login
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    alignItems: 'center',
    position: 'absolute',
    width: 192, 
    height: 59,
    top: 40
  },
  boldTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  inputLayout: {
    position: 'absolute',
    top: 129,
  },
  input: {
    marginVertical: 5,
    width: 301,
    height: 55,
    borderRadius: 10,
    // sh: 0px 4px 4px 0px #00000040;
  },
  button: {
    position: 'absolute',
    top: 553,
    width: 315,
    height: 60,
    borderRadius: 35,
  },
  loginMessage: {
    flexDirection: "row",
    alignItems: 'center',
    position: 'absolute',
    bottom: 40
  },
  loginText: {
    color: '#C58BF2'
  },
});
