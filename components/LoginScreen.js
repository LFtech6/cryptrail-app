import React from 'react';

import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
        <Text style={styles.loginTitle}>Login</Text>
      </View>

      <View style={styles.buttons}>
        <TextInput placeholder={"Username/Email"} style={styles.buttonBox} onPress={() => Alert.alert('Username')}>
        </TextInput>

        <TextInput placeholder={"Password"} style={styles.buttonBox} onPress={() => Alert.alert('Password')}>
        </TextInput> 

        <TouchableOpacity style={styles.buttonBox} onPress={() => Alert.alert('Username')}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
        </View>
        
        <View style={styles.log}>
          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text style={styles.underlinedText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

    </View>
)};

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
buttons: {
  alignItems: 'center',
  marginTop: 50,
},
buttonBox: {
  borderWidth: 1,
  borderRadius: 25,
  paddingVertical: 10, // Adjust this value as needed
  marginVertical: 10,
  width: 220,
  alignItems: 'center',
},
buttonText: {
  fontSize: 18,
  textAlign: 'center',
},
create: {
  fontSize: 18,
  textAlign: 'center',
},
or: {
  marginTop: 20,
},
log: {
  marginTop: 130,
},
underlinedText: {
  marginTop: 130,
  textAlign: 'center',
  textDecorationLine: 'underline',
},
});

export default SignupScreen;