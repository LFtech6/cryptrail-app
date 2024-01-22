//App Navigation
import * as React from "react";
import { View, Image } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import ScreensScreen from "./components/ScreensScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import WatchlistScreen from "./components/WatchlistScreen";
import ProfileScreen from "./components/ProfileScreen";
import DashboardScreen from "./components/DashboardScreen";
import TrailScreen from "./components/TrailScreen";
import NewsScreen from "./components/NewsScreen";
import CoinsScreen from "./components/CoinsScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ headerShown: false })}>
        <Stack.Screen name="Screens" component={ScreensScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard" component={ShowBottomTabs} />
        <Stack.Screen name="Trail" component={ShowBottomTabs} />
        <Stack.Screen name="Coins" component={ShowBottomTabs} />
        <Stack.Screen name="News" component={ShowBottomTabs} />
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export function ShowBottomTabs(){
  return(
      <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle:{backgroundColor:'#FFDE67', }}}>
          <Tab.Screen 
            name='Dashboard' 
            component={DashboardScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', width: responsiveScreenWidth(6), height: responsiveScreenHeight(3)}}>
                  <Image
                    source={require('./assets/home1.png')}
                    style={{
                      width: responsiveScreenWidth(7),
                      height: responsiveScreenHeight(4),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )
            }} />
          <Tab.Screen 
            name='Trail' 
            component={TrailScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', width: responsiveScreenWidth(6), height: responsiveScreenHeight(3)}}>
                  <Image
                    source={require('./assets/cryptrail.png')}
                    style={{
                      width: responsiveScreenWidth(8),
                      height: responsiveScreenHeight(5),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )
            }} />
            <Tab.Screen 
            name='Coins' 
            component={CoinsScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', width: responsiveScreenWidth(6), height: responsiveScreenHeight(3)}}>
                  <Image
                    source={require('./assets/coin1.png')}
                    style={{
                      width: responsiveScreenWidth(7),
                      height: responsiveScreenHeight(4),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )
            }} />
            <Tab.Screen 
            name='News' 
            component={NewsScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', width: responsiveScreenWidth(6), height: responsiveScreenHeight(3)}}>
                  <Image
                    source={require('./assets/news1.png')}
                    style={{
                      width: responsiveScreenWidth(7),
                      height: responsiveScreenHeight(4),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )
            }} />
      </Tab.Navigator>
  )
}

