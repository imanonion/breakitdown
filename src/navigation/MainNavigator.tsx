import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Firebase} from '../services/Firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import OnboardStack from './OnboardStack';
import AppStack from './AppStack'

const { Navigator, Screen } = createNativeStackNavigator()

export default function MainNavigator() {
  const {user, setUser, username, setUsername } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = Firebase.auth().onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        
        if (authenticatedUser) {
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
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="Onboard" component={OnboardStack} />
          {user ? <Screen name="App" component={AppStack} /> : <Screen name="Auth" component={AuthStack} />}
        </Navigator>
    </NavigationContainer>
  );
}