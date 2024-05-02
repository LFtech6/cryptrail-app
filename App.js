import * as React from "react";
import { Image, Text, View } from "react-native";
import { UserProvider } from "./UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GetStartedScreen from "./components/GetStartedScreen";
import LandingScreen from "./components/LandingScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import WatchlistScreen from "./components/WatchlistScreen";
import ProfileScreen from "./components/ProfileScreen";
import DashboardScreen from "./components/DashboardScreen";
import TrailScreen from "./components/TrailScreen";
import MarketScreen from "./components/MarketScreen";
import NewsScreen from "./components/NewsScreen";
import BuyPlacesScreen from "./components/BuyPlacesScreen";

// Linking configuration using the Expo deep link for development
const linking = {
  prefixes: ["exp://10.0.35.193:8081"], // Use your local IP and port as shown in Expo
  config: {
    screens: {
      GetStartedScreen: "getstarted",
      Landing: "landing",
      Signup: "signup",
      Login: "login",
      Forgot: "forgot",
      Watchlist: "watchlist",
      Profile: "profile",
      Dashboard: "dashboard",
      Trail: "trail",
      Market: "market",
      News: "news",
      BuyPlaces: "buy places",
    },
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Component
function ShowBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Set this to false if you do not want to show the label
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 25, // Adjust the bottom value as needed
          left: 20,
          right: 20,
          elevation: 0,
          borderTopWidth: 0,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 15,
        },
        tabBarItemStyle: {
          backgroundColor: "transparent",
          justifyContent: "center", // Center items within the tab bar button
          alignItems: "center", // Center items vertically within the tab bar button
          padding: 0, // Reset padding to ensure icons are centered
        },
      }}
    >
      <Tab.Screen
        name="Trail"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("./assets/home2.png")
                  : require("./assets/home1.png")
              }
              resizeMode="contain"
              style={{
                width: responsiveScreenWidth(7),
                height: responsiveScreenHeight(4),
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Assistant"
        component={TrailScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/cryptrail.png")}
              resizeMode="contain"
              style={{
                width: responsiveScreenWidth(8),
                height: responsiveScreenHeight(5),
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("./assets/coin2.png")
                  : require("./assets/coin1.png")
              }
              resizeMode="contain"
              style={{
                width: responsiveScreenWidth(7),
                height: responsiveScreenHeight(4),
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("./assets/news2.png")
                  : require("./assets/news1.png")
              }
              resizeMode="contain"
              style={{
                width: responsiveScreenWidth(7),
                height: responsiveScreenHeight(4),
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Main" component={MainNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    <Stack.Screen
      name="Landing"
      component={LandingScreen}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen name="Signup" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
    <Stack.Screen name="Watchlist" component={WatchlistScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen
      name="Dashboard0"
      component={ShowBottomTabs}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen
      name="Trail0"
      component={ShowBottomTabs}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen
      name="Market0"
      component={ShowBottomTabs}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen
      name="News0"
      component={ShowBottomTabs}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen name="BuyPlaces" component={BuyPlacesScreen} />
  </Stack.Navigator>
);
