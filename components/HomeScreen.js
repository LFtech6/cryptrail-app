//HomeScreen
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthRequest } from 'expo-auth-session/providers/google';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
    <Image source={require('../assets/cryptrail.png')} style={styles.cryptrail}/>
    <View style={styles.begin}>
        <Text style={styles.title}>Cryptrail</Text>
        <Text style={styles.desc}>Discover your crypto Journey</Text>
    </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonBox}>
        <Image source={require('../assets/glogo.png')} style={styles.glogo} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBox} onPress={() => Alert.alert('Continuar com Apple')}>
          <FontAwesome name="apple" style={styles.icon}/>
          <Text style={styles.buttonText}>Continue with Apple </Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.log} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
        
        <View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.underlinedText}>Already have an account?</Text>
        </TouchableOpacity>
        </View>
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
    justifyContent: 'flex-end', // Adjust the alignment of items within the yellow background
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    paddingHorizontal: 20,
    paddingBottom: 20, 
  },
  cryptrail: {
    height: responsiveScreenHeight(3.5),
    width: responsiveScreenHeight(80),
    resizeMode: 'contain',
    marginBottom: 70,
  },
  begin: {
    marginBottom: 127,
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
  buttons: {
    alignItems: 'center',
    marginTop: 50,
  },
  buttonBox: {
    flexDirection: 'row', 
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
    fontSize: 15.8,
    color: '#000000',
    marginLeft: 10,
  },
  icon: {
    fontSize: 24, 
    color: '#000000',
  },
  glogo: {
    width: 23.66,
    height: 25,
    resizeMode: 'contain',
  },
  log: {
    flexDirection: 'row', 
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12.5,
    marginVertical: 20,
    width: 161,
    textAlign: 'center',
    marginTop: 50,
  },
  or: {
    marginTop: 40,
  },
  
  underlinedText: {
    marginTop: 90,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default HomeScreen;