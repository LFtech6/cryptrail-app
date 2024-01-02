import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import ScreensScreen from "./components/ScreensScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import FavCoinsScreen from "./components/FavCoinsScreen";
import ProfileScreen from "./components/ProfileScreen";
import DashboardScreen from "./components/DashboardScreen";
import CrypScreen from "./components/CrypScreen";
import CoinsInfoScreen from "./components/CoinsInfoScreen";
import NewsScreen from "./components/NewsScreen";
import NavigationBar from "./components/NavigationBar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ route, navigation }) => ({ headerShown: false })}>
        <Stack.Screen name="Screens" component={ScreensScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Favcoins" component={FavCoinsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Cryp" component={CrypScreen} />
        <Stack.Screen name="Coins" component={CoinsInfoScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Navigation" component={NavigationBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
