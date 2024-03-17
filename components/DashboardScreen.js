import React, { useState, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenHeight } from 'react-native-responsive-dimensions';

const DashScreen = ({ navigation }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
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
  const Dcoins = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
  ];
  const coins = [
    { label: 'Euro', value: 'euro' },
    { label: 'Dollar', value: 'dollar' },
  ];
  const watchlist = [
    { key: 'bitcoin', symbol: 'BTC' },
    { key: 'ethereum', symbol: 'ETH' },
    { key: 'ripple', symbol: 'XRP' },
    { key: 'litecoin', symbol: 'LTC' },
    { key: 'cardano', symbol: 'ADA' },
    { key: 'polkadot', symbol: 'DOT' },
    { key: 'bitcoinCash', symbol: 'BCH' },
    { key: 'stellar', symbol: 'XLM' },
    { key: 'chainlink', symbol: 'LINK' },
    { key: 'binanceCoin', symbol: 'BNB' },
    { key: 'tether', symbol: 'USDT' },
  ];
  
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
          <Text style={styles.title}>Converter</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCoin(value)}
            items={Dcoins}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select a coin...', value: null }}
          />
          <RNPickerSelect
            onValueChange={(value) => setSelectedCoin(value)}
            items={coins}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select a currency...', value: null }}
          />
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
  watchlistTitle: {
    fontSize: 35,
    color: '#000',
    marginTop: 30,
    marginHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    marginBottom: 80,
  },
  coinButton: {
    backgroundColor: '#E5E3E3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  coinText: {
    fontSize: responsiveFontSize(2.2),
    color: '#000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: -100,
    right: -50,
    bottom: -600,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: responsiveFontSize(2),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default DashScreen;
