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
      <Text>Create your account</Text>
      <Input status='primary' placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input
        style={styles.input} status='primary' placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}
      />

      {registerError ? (
        <ErrorMessage error={registerError} visible={true} />
      ) : null}

      <Button status='success' onPress={registerUser}>SIGN UP</Button>
      <Layout style={styles.loginMessage}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={styles.text}>
            Login Here!
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
  loginMessage: {
    flexDirection: "row",
    marginVertical: 40,
  },
  input: {
    marginVertical: 5
  },
  text: {
    marginHorizontal: 8
  }
});
