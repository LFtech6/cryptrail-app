//ForgotPasswordScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import { responsiveWidth, responsiveFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setIsClicked((prevState) => !prevState);
  };

  useEffect(() => {
    validateForm();
  }, [email, newPassword, pin]);

  const validateForm = () => {
    let errors = {};
    
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    
    if (!newPassword) {
      errors.newPassword = "Password is required.";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters.";
    }

    
    if (!pin) {
      errors.pin = "PIN is required.";
    } else if (pin.length !== 4) {
      errors.pin = "PIN must be 4 digits.";
    }

    
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };


  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://192.168.1.191:3000/resetPassword', {
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
      <View style={styles.container}>
        <View style={styles.yellowBackground}>
          <Image
            source={require("../assets/cryptrail.png")}
            style={styles.cryptrail}
          />
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <View style={styles.write}>
      <TextInput
        style={styles.placeholder}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.placeholder}
        placeholder="PIN"
        value={pin}
        secureTextEntry={!showPassword}
        onChangeText={setPin}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.placeholder}
        secureTextEntry={!showPassword}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
              name={showPassword}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}

            >
              <Image
                style={styles.icon}
                source={
                  isClicked
                    ? require("../assets/hide.png")
                    : require("../assets/view.png")
                }
              />
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                style={[styles.buttonBox, { opacity: isFormValid ? 1 : 0.5 }]}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
      </View>
      {Object.values(errors).map((error, index) => (
            <Text key={index} style={styles.error}>
              {error}
            </Text>
          ))}
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  yellowBackground: {
    backgroundColor: "#FFD464",
    width: "100%",
    height: "43%",
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    paddingHorizontal: 20,
  },
  cryptrail: {
    height: responsiveScreenHeight(3.5),
    width: responsiveScreenHeight(80),
    resizeMode: "contain",
    marginBottom: 69,
  },
  title: {
    fontSize: 48,
    color: "#000",
    marginBottom: 109,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  buttonBox: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
    backgroundColor: "#B3B3B3",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  write: {
    alignItems: "center",
    marginTop: 60,
  },
  icon: {
    alignSelf: "center",
    width: 24,
    height: 24,
  },
  placeholder: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
    fontSize: 17,
    backgroundColor: "#E6E6E6",
    marginTop: 5,
    fontSize: 18,
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 11,
  },
});

export default ForgotPasswordScreen;
