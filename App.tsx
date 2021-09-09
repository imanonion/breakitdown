import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { ApplicationProvider } from "@ui-kitten/components";
import { OnboardWelcome } from "./src/navigation/MainNavigator";

export default () => (
  <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <OnboardWelcome />
  </ApplicationProvider>
);

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
