import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import OnboardStack from "./src/navigation/OnboardStack";


export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <OnboardStack />
    </ApplicationProvider>
  </>
);