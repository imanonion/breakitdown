import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  error: string;
  visible: boolean;
}

const ErrorMessage = ({ error, visible }: Props) => {
  if (!error || !visible) {
    return null;
  }
  return <Text style={styles.errorText}>⚠️ {error}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorText: {
    // color: "#fdca40",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
});
