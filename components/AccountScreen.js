//AccountScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../UserContext";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";

const AccountScreen = ({ navigation }) => {
  const { user } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [storedPin, setStoredPin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchPinAndPassword = async () => {
      try {
        const pin = await AsyncStorage.getItem("pin");
        const storedPassword = await AsyncStorage.getItem("password");
        setStoredPin(pin);
        setPassword(storedPassword);
      } catch (error) {
        console.error("Error fetching PIN and password:", error);
      }
    };

    fetchPinAndPassword();
  }, []);

  const handleRevealPassword = () => {
    if (enteredPin === storedPin) {
      setShowPassword(true);
    } else {
      Alert.alert("Incorrect PIN", "The PIN you entered is incorrect.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Password:</Text>
          {showPassword ? (
            <Text style={styles.value}>{password}</Text>
          ) : (
            <Text style={styles.value}>******</Text>
          )}
        </View>
      </View>
      <View style={{ flex: 1.8 }}>
        {!showPassword && (
          <View style={styles.pinContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter PIN to reveal password"
              value={enteredPin}
              onChangeText={setEnteredPin}
              keyboardType="numeric"
              maxLength={4}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleRevealPassword}
            >
              <Text style={styles.buttonText}>Reveal Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
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
  info: {
    flex: 1,
    marginBottom: responsiveScreenHeight(1),
  },
  infoContainer: {
    marginTop: responsiveScreenHeight(2),
    flexDirection: "row",
    marginBottom: responsiveScreenHeight(2),
    paddingHorizontal: responsiveWidth(3),
  },
  label: {
    fontWeight: "bold",
    flex: 1,
    fontSize: responsiveFontSize(2),
  },
  value: {
    flex: 2,
    fontSize: responsiveFontSize(2),
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: responsiveWidth(3),
    marginBottom: responsiveScreenHeight(2),
    width: responsiveWidth(60),
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
  forgotPasswordText: {
    marginTop: responsiveScreenHeight(2),
    color: "#007bff",
    textDecorationLine: "none",
    textAlign: "center",
    fontSize: responsiveFontSize(2),
  },
});

export default AccountScreen;
