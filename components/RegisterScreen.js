//RegisterScreen
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Image, Keyboard, KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const SignupScreen = ({ navigation }) => {
  
  //register "startpoint"
  const [userRegister] = useState('');
  const sendToReg = async () => {
    console.log('sending request');
    try {
      const response = await axios.post('http://192.168.1.86:62969/register', {
      username: name,
      email: email,
      password: password
    });    
  } catch (error) {
    console.error('Erro na comunicação com o registo:', error);
  }
};

//register requirements
const [name, setName] = useState(''); 
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState(''); 
const [errors, setErrors] = useState({}); 
const [isFormValid, setIsFormValid] = useState(false); 

useEffect(() => { 
  validateForm(); 
}, [name, email, password]); 

const validateForm = () => { 
  let errors = {}; 
  
  // Validate name field 
  if (!name) { 
    errors.name = 'Name is required.'; 
  } 
  
  // Validate email field 
  if (!email) { 
    errors.email = 'Email is required.'; 
  } else if (!/\S+@\S+\.\S+/.test(email)) { 
    errors.email = 'Email is invalid.'; 
  } 
  
  // Validate password field 
  if (!password) { 
    errors.password = 'Password is required.'; 
  } else if (password.length < 8) { 
    errors.password = 'Password must be at least 8 characters.'; 
  } 
  
  // Set the errors and update form validity 
  setErrors(errors); 
  setIsFormValid(Object.keys(errors).length === 0); 
}; 
const handleSubmit = () => { 
  if (isFormValid) { 
    console.log('User Registado com sucesso!'); 
  } else { 
    console.log('Errors detected.'); 
  } 
}; 

//hide and unhide password
const [showPassword, setShowPassword] = useState(false); 

const toggleShowPassword = () => { 
  setShowPassword(!showPassword); 
}; 

//page
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.container}>
  <View style={styles.yellowBackground}>
  <Image source={require('../assets/cryptrail.png')} style={styles.cryptrail}/>
  <Text style={styles.title}>Register</Text>
  </View>
  <View style={styles.write}>
  <SafeAreaView>
  <TextInput 
  style={styles.placeholder} 
  placeholder="Name"
  value={name} 
  onChangeText={setName} 
  /> 
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
  <MaterialCommunityIcons style={styles.icon}
  name={showPassword ? 'eye-off' : 'eye'} 
  size={24} 
  color="#aaa"
  onPress={toggleShowPassword} 
  />
  <View style={styles.button}>
  <TouchableOpacity 
  style={[styles.buttonBox,  { opacity: isFormValid ? 1 : 0.5 }]} 
  disabled={!isFormValid} 
  onPress={() => {
    handleSubmit();
    sendToReg();
    navigation.navigate("Dashboard0");
  }}
  > 
  <Text style={styles.buttonText}>Create</Text>
  </TouchableOpacity>
  </View>
  </SafeAreaView>
  {/* Display error messages */} 
  {Object.values(errors).map((error, index) => ( 
    <Text key={index} style={styles.error}> 
    {error} 
    </Text> 
    ))} 
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text style={styles.underlinedText}>Already have an account?</Text>
    </TouchableOpacity>
    </View>
    </View>
    </TouchableWithoutFeedback>
    )};
    
    //styles
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
      },
      yellowBackground: {
        backgroundColor: '#FFD464',
        width: '100%',
        height: '43%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 63,
        borderBottomRightRadius: 63,
        paddingHorizontal: 20, 
      },
      cryptrail: {
        height: responsiveScreenHeight(3.5),
        width: responsiveScreenHeight(80),
        resizeMode: 'contain',
        marginBottom: 69,
      },
      title: {
        fontSize: 48,
        color: '#000',
        marginBottom: 109,
      },  
      button: {
        alignItems: 'center',
        marginTop: 30,
      },
      buttonBox: {
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 10,
        width: 250,
        alignItems: 'center',
        backgroundColor: '#B3B3B3',
      },
      icon: {
        textAlign: 'center',
      },
      write: {
        alignItems: 'center', 
      },
      placeholder: {
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        width: 250,
        alignItems: 'center',
        fontSize: 17,
        backgroundColor: '#E6E6E6',
        marginTop: 5,
        fontSize: 18,
        color: '#000',
      },
      user: {
        marginTop: 20,
        fontSize: 18,
        alignItems: 'flex-start',
      },
      create: {
        marginTop: 20,
        fontSize: 18,
      },
      buttonText: {
        fontSize: 18,
        textAlign: 'center',
      },
      error: { 
        color: 'red', 
        fontSize: 11, 
      },
      underlinedText: {
        marginTop: 60,
        textAlign: 'center',
        textDecorationLine: 'underline',
      }, 
    });
    
    export default SignupScreen;