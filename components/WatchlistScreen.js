import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const WatchlistScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <View style={styles.yellowBackground}>
    <Image source={require('../assets/cryptrail.png')} style={styles.cryptrail}/>
    <View style={styles.begin}>
        <Text style={styles.title}>Watchlist</Text>
        <Text style={styles.desc}>Select your favorite coins</Text>
    </View>
    </View>
    <View style={styles.search}>
    <Image source={require('../assets/lupa.png')} style={styles.glove} />
    <TextInput placeholder="Search Coins...">
    </TextInput>
    </View>
    <ScrollView style={styles.scroll}>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/bitcoin.png')} style={styles.icon}/>
    <Text style={styles.text}>Bitcoin</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/ethereum.png')} style={styles.icone}/>
    <Text style={styles.text}>Ethereum</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/tether.png')} style={styles.icon}/>
    <Text style={styles.text}>Tether USDt</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/bnb.png')} style={styles.icon}/>
    <Text style={styles.text}>BNB</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/solana.png')} style={styles.icon}/>
    <Text style={styles.text}>Solana</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/xrp.png')} style={styles.icon}/>
    <Text style={styles.text}>XRP</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/cardano.png')} style={styles.icon}/>
    <Text style={styles.text}>Cardano</Text>
    </TouchableOpacity>
    </ScrollView>
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
    <Text style={styles.underlinedText}>Let´s go!</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    yellowBackground: {
      backgroundColor: '#FFC107',
      width: '100%',
      height: '43%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderBottomLeftRadius: 63,
      borderBottomRightRadius: 63,
      paddingHorizontal: 20, 
    },
    cryptrail: {
      height: responsiveScreenHeight(3.5),
      width: responsiveScreenHeight(80),
      resizeMode: 'contain',
      marginBottom: 70,
    },
    begin: {
      marginBottom: 87,
    },
    title: {
      fontSize: 48,
      color: '#000',
    },
    desc: {
      fontSize: 16,
      color: '#000',
      marginTop: 10,
    },
    scroll: {
      marginBottom: 10,
    },
    search: {
      marginTop: 20,
      flexDirection: 'row', 
      borderWidth: 0.5,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
      alignItems: 'center',
    },
    glove: {
      marginHorizontal: 5,
      height: 20,
      width: 20,
    },
    namebox: {
      flexDirection: 'row', 
      paddingVertical: 5,
      paddingHorizontal: 5,
      width: '100%',
      textAlign: 'left',
      marginTop: 15,
      alignItems: 'center',
    },
    icon: {
      alignItems: 'flex-end',
      height: 35,
      width: 35,
    },
    icone: {
      alignItems: 'flex-end',
      height: 40,
      width: 35
    },
    text: {
      fontSize: 16,
      textAlign: 'left',
      paddingHorizontal: 20,
    },
    underlinedText: {
      marginBottom: 20,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
  
export default WatchlistScreen;