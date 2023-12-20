import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
        <Text style={styles.loginTitle}>Registo</Text>
      </View>

      <View style={styles.write}>
        <TextInput placeholder="Username" style={styles.placeholder} onPress={() => Alert.alert('Username')}>
        </TextInput>
        <TextInput placeholder="Email" style={styles.placeholder} onPress={() => Alert.alert('Email')}>
        </TextInput>
        <TextInput placeholder="Password" style={styles.placeholder} onPress={() => Alert.alert('Password')}>
        </TextInput>
        </View>
        <View style={styles.button}>
        <TouchableOpacity style={styles.buttonBox} onPress={() => Alert.alert('Criar')}>
          <Text style={styles.create}>Criar</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.underlinedText}>Já tens uma conta?</Text>
          </TouchableOpacity>
          </View>
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
button: {
  alignItems: 'center',
  marginTop: 50,
},
buttonBox: {
  borderWidth: 1,
  borderRadius: 25,
  paddingVertical: 5,
  paddingHorizontal: 20,
  marginVertical: 10,
  width: 250,
  alignItems: 'center',
},
write: {
  alignItems: 'center',
  marginTop: 50,
},
placeholder: {
  borderWidth: 1,
  borderRadius: 25,
  paddingVertical: 5,
  paddingHorizontal: 20,
  marginVertical: 10,
  width: 250,
  alignItems: 'center',
},
user: {
  marginTop: 20,
  fontSize: 18,
  alignItems: 'flex-start',
},
email: {
  marginTop: 20,
  fontSize: 18,
  color: '#000',
},
password: {
  marginTop: 20,
  fontSize: 18,
  color: '#000',
},
create: {
  marginTop: 20,
  fontSize: 18,
},
underlinedText: {
  marginTop: 100,
  textAlign: 'center',
  textDecorationLine: 'underline',
},
});

export default SignupScreen;