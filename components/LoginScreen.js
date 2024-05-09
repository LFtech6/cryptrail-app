import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
import { useUser } from "../UserContext";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser(); // Use the user context to set user data
  const [isClicked, setIsClicked] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.70:3000/login", {
        email,
        password,
      });
      if (response.data.user) {
        const userData = response.data.user;

        // Store user details and password in AsyncStorage
        await AsyncStorage.setItem("userId", JSON.stringify(userData.id));
        await AsyncStorage.setItem("username", userData.username);
        await AsyncStorage.setItem("email", userData.email);
        await AsyncStorage.setItem("password", password); // Store the plain password

        setUser(userData); // Update the user context
        navigation.navigate("Dashboard0");
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again."
      );
    }
  };

  //login requirements
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};
    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  //hide and unhide password
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setIsClicked((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.yellowBackground}>
          <Image
            source={require("../assets/cryptrail.png")}
            style={styles.cryptrail}
          />
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.write}>
          <SafeAreaView>
            <TextInput
              style={styles.placeholder}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.placeholder}
              placeholder="Password"
              placeholderTextColor="#aaa"
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
                disabled={!isFormValid}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          {/* Display error messages */}
          {Object.values(errors).map((error, index) => (
            <Text key={index} style={styles.error}>
              {error}
            </Text>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text style={styles.underlinedText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

//styles
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
  icon: {
    alignSelf: "center",
    width: 24,
    height: 24,
  },
  write: {
    alignItems: "center",
    marginTop: 60,
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
  create: {
    marginTop: 20,
    fontSize: 18,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 11,
  },
  underlinedText: {
    marginTop: 60,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default SigninScreen;
