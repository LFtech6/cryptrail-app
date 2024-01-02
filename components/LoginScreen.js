import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.191:3000/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      // Navigate to the next screen or show success message
    } catch (error) {
      Alert.alert('Login Failed', error.response.data.error);
    }
  };
  //hide and unhide password
  const [showPassword, setShowPassword ] = useState(false); 
  
  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 
  
  //page
  return (
    <View style={styles.container}>
    <View style={styles.yellowBackground}>
    <Text style={styles.title}>Login</Text>
    </View>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} acessible={false}>
    <SafeAreaView>
    <View style={styles.write} >
    <TextInput onChangeText={setEmail} placeholder="Email" style={styles.placeholder}>
    </TextInput>
    <TextInput
    secureTextEntry={!showPassword} 
    onChangeText={setPassword} 
    style={styles.placeholder} 
    placeholder="Password"
    placeholderTextColor="#aaa"
    />
    <MaterialCommunityIcons style={styles.icon}
    name={showPassword ? 'eye-off' : 'eye'} 
    size={24} 
    color="#aaa"
    onPress={toggleShowPassword} 
    />
    </View>
    <View style={styles.button}>
    <TouchableOpacity style={styles.buttonBox} onPress={handleLogin}>
    <Text style={styles.buttonText}>Enter</Text>
    </TouchableOpacity>
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
    <Text style={styles.underlinedText}>Don´t have an account yet?</Text>
    </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
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
      button: {
        alignItems: 'center',
        marginTop: 95,
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
        marginTop: -20,
      },
      placeholder: {
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 10,
        width: 250,
        alignItems: 'center',
        fontSize: 17,
        backgroundColor: '#E6E6E6',
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
        marginTop: 135,
        textAlign: 'center',
        textDecorationLine: 'underline',
      },
      buttonText: {
        fontSize: 18,
        textAlign: 'center',
      },
    });
    
    export default SignupScreen;