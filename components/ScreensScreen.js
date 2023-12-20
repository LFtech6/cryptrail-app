import React from "react";
import { Button, View, Text } from "react-native";

export default function ScreensScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screens Screen</Text>
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate("Signup")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Go to Forgot Password"
        onPress={() => navigation.navigate("Forgot")}
      />
    </View>
  );
}
