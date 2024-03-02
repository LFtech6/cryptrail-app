import * as React from "react";
import { Image, Text } from "react-native";
import { responsiveScreenWidth, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "./components/LandingScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import WatchlistScreen from "./components/WatchlistScreen";
import ProfileScreen from "./components/ProfileScreen";
import DashboardScreen from "./components/DashboardScreen";
import TrailScreen from "./components/TrailScreen";
import NewsScreen from "./components/NewsScreen";
import MarketScreen from "./components/MarketScreen";

// Linking configuration using the Expo deep link for development
const linking = {
  prefixes: ['exp://192.168.1.86:8081'], // Use your local IP and port as shown in Expo
  config: {
    screens: {
      Landing: 'landing',
      Signup: 'signup',
      Login: 'login',
      Forgot: 'forgot',
      Watchlist: 'watchlist',
      Profile: 'profile',
      Dashboard: 'dashboard',
      Trail: 'trail',
      Market: 'market',
      News: 'news',
    },
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ShowBottomTabs() {
  return (
    <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      color: 'black',
    },
    tabBarStyle: {
      backgroundColor: '#F2F2F2',
      position: 'absolute',

    }
  }}
>
        <Tab.Screen 
            name='Trail' 
            component={DashboardScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                    source={focused ? require('./assets/home2.png') : require('./assets/home1.png')}
                    resizeMode='contain'
                    style={{
                      width: responsiveScreenWidth(7),
                      height: responsiveScreenHeight(4),
                    }}
                />
              ),
            }} 
        />
        <Tab.Screen 
            name='Assistant' 
            component={TrailScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                    source={require('./assets/cryptrail.png')}
                    resizeMode='contain'
                    style={{
                      width: responsiveScreenWidth(8),
                      height: responsiveScreenHeight(5),
                    }}
                />
              ),
            }} 
        />
        <Tab.Screen 
            name='Market' 
            component={MarketScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                    source={focused ? require('./assets/coin2.png') : require('./assets/coin1.png')}
                    resizeMode='contain'
                    style={{
                      width: responsiveScreenWidth(7),
                      height: responsiveScreenHeight(4),
                    }}
                />
              ),
            }} 
        />
        <Tab.Screen 
            name='News' 
            component={NewsScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                source={focused ? require('./assets/news2.png') : require('./assets/news1.png')}
                    resizeMode='contain'
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
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard0" component={ShowBottomTabs} />
        <Stack.Screen name="Trail0" component={ShowBottomTabs} />
        <Stack.Screen name="Market0" component={ShowBottomTabs} />
        <Stack.Screen name="News0" component={ShowBottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
