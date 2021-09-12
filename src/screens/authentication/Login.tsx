import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ErrorMessage from "../../components/ErrorMessage";
import { Button, Layout, Text, Divider, Input } from "@ui-kitten/components";
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParams";

import {Firebase} from '../../services/Firebase'

//type checking for Login screen
type LoginScreenProp = NativeStackScreenProps<RootStackParamsList, "Login">;

export default function Login({ navigation }: LoginScreenProp) {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>("");
  const {username, setUsername} = useContext(AuthenticatedUserContext)

  // const {isAdmin, setIsAdmin} = useContext(AuthenticatedUserContext)

  const login = async () => {
    try {
      if (email && password) {
        await Firebase.auth().signInWithEmailAndPassword(email, password);

        //get username
        const uid = Firebase.auth().currentUser?.uid

        const getUsername = async () => {
            try {
                const fetchUserDoc = await Firebase.firestore().collection('users').doc(uid).get()

                const userData = fetchUserDoc.data()

                if(!userData) {
                    throw new Error('could not fetch user doc')
                } else if (userData) {
                    setUsername(userData.username)
                    console.log(userData.username)
                }

            } catch (err) {
                console.log(err)
            }
        }
        getUsername()
        console.log(username)
        //check admin status
        // const uid = Firebase.auth().currentUser?.uid

        // const checkIsAdmin = async () => {
        //   try {
        //     const fetchUserDoc = await Firebase.firestore().collection('users').doc(uid).get()

        //     const userData = fetchUserDoc.data()
            
        //     if(!userData) {
        //       throw new Error('could not fetch user doc')
        //     }
        //     else if (userData.isAdmin === 'true') {
        //       setIsAdmin(userData.isAdmin)
        //       console.log(`user is admin`)
        //     } else {
        //       setIsAdmin(false)
        //       console.log(`no admin status`)
        //     }

        //   } catch (err) {
        //     console.log(err)
        //   }
        // }
        // checkIsAdmin()

      }
    } catch (err) {
        console.log(err);
      setLoginError(err.message);
    }
  };

  
  return (
    <Layout style={styles.container} level='1'>
      <Layout style={styles.title}>
        <Text>Hey there,</Text>
        <Text style={styles.boldTitle}>Welcome Back!</Text>
      </Layout>
      <Layout style={styles.inputLayout}>
        <Input style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        <Input
          style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}
        />

        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      </Layout>

      <Layout style={styles.forgotPassword}>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{textDecorationLine: "underline"}}> Forgot your password?</Text>
      </TouchableOpacity>
      </Layout>

      <Button style={styles.button} onPress={login}>Login</Button>

      <Layout style={styles.registerMessage}>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={styles.registerText}>
            Register
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
    position: 'absolute',
    alignItems: 'center',
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
    top: 129
  },
  forgotPassword: {
    position: 'absolute',
    top: 255
  },
  input: {
    marginVertical: 0,
    width: 301,
    height: 55,
    borderRadius: 10
  },
  button: {
    position: 'absolute',
    top: 553,
    width: 315,
    height: 60,
    borderRadius: 35,
  },
  registerMessage: {
    flexDirection: "row",
    alignItems: 'center',
    position: 'absolute',
    bottom: 40
  },
  registerText: {
    color: '#C58BF2'
  },
});
