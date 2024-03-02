//ScreensScreen
import React from "react";
import { Button, View, Text } from "react-native";

export default function ScreensScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screens Screen</Text>
      <Button
        title="(put the page title here)"
        onPress={() => navigation.navigate("(name of the page that your navigating to)")}
      />
    </View>
  );
}
