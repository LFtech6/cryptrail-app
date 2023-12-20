import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
        <Text style={styles.loginTitle}>Cryptrail</Text>
        <Text style={styles.loginDesc}>Discover your crypto Journey</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonBox} onPress={() => Alert.alert('Continuar com Google')}>
          <FontAwesome name="google" style={styles.icon} />
          <Text style={styles.buttonText}>Continuar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBox} onPress={() => Alert.alert('Continuar com Apple')}>
          <FontAwesome name="apple" style={styles.icon} />
          <Text style={styles.buttonText}>Continuar com Apple </Text>
        </TouchableOpacity>

        <Text style={styles.or}>ou</Text>

        <TouchableOpacity style={styles.log} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.underlinedText}>Já tens uma conta?</Text>
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
  loginTitle: {
    fontSize: 48,
    color: '#000',
  },
  loginDesc: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
  },
  buttons: {
    alignItems: 'center',
    marginTop: 50,
  },
  buttonBox: {
    flexDirection: 'row', // Align items in a row
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20, // Add horizontal padding
    marginVertical: 10,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
    fontSize: 15.8,
    color: '#000000',
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    fontSize: 24, // Increase icon size
    color: '#000000',
  },
  log: {
    flexDirection: 'row', // Align items in a row
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12.5,
    marginVertical: 20,
    width: 135,
    textAlign: 'center',
  },
  or: {
    marginTop: 20,
  },
  underlinedText: {
    marginTop: 130,
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
