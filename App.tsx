import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold  } from "@expo-google-fonts/poppins";
import { SafeAreaView } from 'react-native';
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthenticatedUserProvider } from "./src/navigation/AuthenticatedUserProvider";
import MainNavigator from "./src/navigation/MainNavigator";

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <SafeAreaProvider>
        <AuthenticatedUserProvider>
          <MainNavigator />
        </AuthenticatedUserProvider>
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
);