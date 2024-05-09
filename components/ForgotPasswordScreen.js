import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import { responsiveWidth, responsiveFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pin, setPin] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://192.168.1.70:3000/resetPassword', {
        email,
        pin,
        newPassword
      });

      if (response.data.success) {
        Alert.alert('Success', 'Password has been reset successfully.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'There was an issue resetting your password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    backgroundColor: "white",
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginBottom: responsiveScreenHeight(10),
    paddingHorizontal: responsiveWidth(3),
    marginTop: responsiveScreenHeight(5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: responsiveWidth(3),
    marginBottom: responsiveScreenHeight(2),
    width: responsiveWidth(90),
    alignSelf: "flex-start",
    marginLeft: responsiveWidth(4),
  },
  button: {
    backgroundColor: "#007bff",
    padding: responsiveWidth(3),
    borderRadius: 5,
    alignItems: "center",
    width: responsiveWidth(34),
    marginBottom: responsiveScreenHeight(2),
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.6),
  },
});

export default ForgotPasswordScreen;
