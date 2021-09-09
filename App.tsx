import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { ApplicationProvider } from "@ui-kitten/components";
import OnboardStack from "./src/navigation/OnboardStack";

export default () => (
  <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <OnboardStack />
  </ApplicationProvider>
);