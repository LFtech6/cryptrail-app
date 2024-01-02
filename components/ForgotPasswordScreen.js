import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <View style={styles.yellowBackground}>
            <Text style={styles.title}>Forgot Password</Text>
          </View>
        <View style={styles.write}>
          <Text style={styles.Text}>
          Write your email so we can send you instructions of how to reset your password.
          </Text>
          <TextInput placeholder="Username/Email" style={styles.placeholder} onPress={() => Alert.alert('Username or Email')}>
        </TextInput>
        <TouchableOpacity style={styles.buttonBox} onPress={() => Alert.alert('Sent')}>
          <Text style={styles.buttonText}>Send</Text>
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
title: {
  fontSize: 48,
  color: '#000',
},
placeholder: {
  borderWidth: 1,
  borderRadius: 25,
  paddingVertical: 5,
  paddingHorizontal: 20,
  marginVertical: 10,
  width: 250,
  alignItems: 'center',
  fontSize: 17,
  marginTop: 50,
},
write: {
  alignItems: 'center',
  marginTop: 50,
},
Text: {
  textAlign: 'center',
  marginTop: 30,
  width: '70%',
  fontSize: 16,
},
buttonBox: {
  borderWidth: 1,
  borderRadius: 25,
  paddingVertical: 5,
  paddingHorizontal: 20,
  marginVertical: 10,
  width: 250,
  alignItems: 'center',
  marginTop: 100,
},
buttonText: {
  fontSize: 17,
  textAlign: 'center',
},
});

export default ForgotPasswordScreen;