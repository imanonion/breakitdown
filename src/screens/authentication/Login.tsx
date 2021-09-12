import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ErrorMessage from "../../components/ErrorMessage";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../RootStackParamsList";

import {Firebase} from '../../services/Firebase'

//type checking for Login screen
type LoginScreenProp = NativeStackScreenProps<RootStackParamsList, "Login">;

export default function Login({ navigation }: LoginScreenProp) {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>("");
  const {isAdmin, setIsAdmin} = useContext(AuthenticatedUserContext)

  const login = async () => {
    try {
      if (email && password) {
        await Firebase.auth().signInWithEmailAndPassword(email, password);

        //check admin status
        const uid = Firebase.auth().currentUser?.uid

        const checkIsAdmin = async () => {
          try {
            const fetchUserDoc = await Firebase.firestore().collection('users').doc(uid).get()

            const userData = fetchUserDoc.data()
            
            if(!userData) {
              throw new Error('could not fetch user doc')
            }
            else if (userData.isAdmin === 'true') {
              setIsAdmin(userData.isAdmin)
              console.log(`user is admin`)
            } else {
              setIsAdmin(false)
              console.log(`no admin status`)
            }

          } catch (err) {
            console.log(err)
          }
        }
        checkIsAdmin()

      }
    } catch (err) {
        console.log(err);
      setLoginError(err.message);
    }
  };

  
  return (
    <Layout style={styles.container} level='1'>
      <Text>Login with your details:</Text>
      <Input status='primary' placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input
        style={styles.input} status='primary' placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}
      />

      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

      <Layout style={styles.viewOptions}>
        <Button status='primary' onPress={login}>LOG IN</Button>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.inlineOptions}
        >
          <Text style={styles.text}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </Layout>
      <Layout style={styles.viewOptions}>
        <Text style={styles.inlineOptions}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.inlineOptions}
        >
          <Text style={styles.text}>
            Register here
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
    margin: 9,
  },
  viewOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  inlineOptions: {
    marginHorizontal: 5,
  },
  input: {
    marginVertical: 5
  },
  text: {
    marginHorizontal: 8
  }
});
