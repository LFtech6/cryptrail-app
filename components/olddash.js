import React, { useState, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Converter from './Converter.js';

const DashScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(responsiveWidth(75))).current; // Menu initially positioned off-screen to the right
  const contentAnimation = useRef(new Animated.Value(0)).current; // Content initially in its normal position
  
  const toggleMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: menuVisible ? responsiveWidth(75) : 0, // Slide in menu or slide out
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnimation, {
        toValue: menuVisible ? 0 : -responsiveWidth(75), // Shift content left or back to original position
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
    
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Animated.View style={[
          styles.menu,
          {
            transform: [{ translateX: menuAnimation }],
          },
        ]}>
          <Text style={styles.menuItem}>Profile</Text>
          <Text style={styles.menuItem}>Settings</Text>
          {/* Additional menu items */}
        </Animated.View>
        
        <Animated.View style={[
          styles.content,
          {
            transform: [{ translateX: contentAnimation }],
          },
        ]}>
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={require('../assets/me2.png')} style={styles.user} />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
          <Converter />
          
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  user: {
    height: responsiveScreenHeight(5),
    width: responsiveWidth(180),
    marginTop: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 35,
    color: '#000',
    marginTop: 20,
    marginHorizontal: 20,
  },
  menu: {
    position: 'absolute',
    top: -100,
    right: -50,
    bottom: -700,
    width: responsiveWidth(75),
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  
  menuItem: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default DashScreen;
