import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image} from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = ({ navigation }) => {
  
//login requirements
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});  
const [isFormValid, setIsFormValid] = useState(false); 

useEffect(() => { 
  validateForm(); 
}, [email]); 

const validateForm = () => { 
  let errors = {}; 
  // Validate email field 
  if (!email) { 
    errors.email = 'Email is required.'; 
  } else if (!/\S+@\S+\.\S+/.test(email)) { 
    errors.email = 'Email is invalid.'; 
  } 
}; 
const handleSubmit = () => { 
  if (isFormValid) { 
    console.log('Form submitted successfully!'); 
  } else { 
    console.log('Form has errors. Please correct them.'); 
  } 
}; 

//page
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.container}>
  <View style={styles.yellowBackground}>
  <Image source={require('../assets/cryptrail.png')} style={styles.cryptrail}/>
  <Text style={styles.title}>Forgot Password</Text>
  </View> 
  <View style={styles.write}>
  <Text style={styles.Text}>
    Write your email so we can send you instructions of how to reset your password.
    </Text>
  <SafeAreaView>
  <TextInput 
  style={styles.placeholder} 
  placeholder="Email"
  value={email} 
  onChangeText={setEmail} 
  /> 
  <View style={styles.button}>
  <TouchableOpacity 
  style={[styles.buttonBox,  { opacity: isFormValid ? 1 : 0.5 }]} 
  disabled={!isFormValid} 
  onPress={() => {
    handleSubmit();
    //sendToLog(); the one missing part of login connection to database
    navigation.navigate("Login");
  }}
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
      write: {
        alignItems: 'center',
        marginTop: 10,
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
      send: {
        marginTop: 20,
        fontSize: 18,
      },
      Text: {
        textAlign: 'center',
        marginTop: 30,
        width: '70%',
        fontSize: 16,
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
    
    export default ForgotPasswordScreen;