import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';


const SignupScreen = ({ navigation }) => {

  //register "startpoint"
  const [userRegister] = useState('');
  const sendToReg = async () => {
    console.log('sending request');
    try {
      const response = await axios.post('http://192.168.1.77:3000/register', {
        username: name,
        email: email,
        password: password
    });    
    } catch (error) {
        console.error('Error communicating with Register:', error);
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
  
        if (!name) { 
            errors.name = 'Name is required.'; 
        } 
        //for change email validator
        if (!email) { 
            errors.email = 'Email is required.'; 
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { 
            errors.email = 'Email is invalid.'; 
        } 
        if (!password) { 
            errors.password = 'Password is required.'; 
        } else if (password.length == 8) { 
            errors.password = 'Password requires 8 characters.'; 
        } 
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 
  
    const handleSubmit = () => { 
        if (isFormValid) { 
            console.log('Form submitted successfully!'); 
        } else { 
            console.log('Form has errors. Please correct them.'); 
        } 
    }; 
  
//hide and unhide password
    const [showPassword, setShowPassword] = useState(false); 
  
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
  
//page
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
        <Text style={styles.title}>Register</Text>
      </View> 
      <View style={styles.write}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} acessible={false}>
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
                  navigation.navigate("Dashboard");
              }}
            > 
                <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
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
)};

//styles
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
  marginTop: 60,
  textAlign: 'center',
  textDecorationLine: 'underline',
},
buttonText: {
  fontSize: 18,
  textAlign: 'center',
},
});

export default SignupScreen;