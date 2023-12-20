import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <View style={styles.yellowBackground}>
            <Text style={styles.loginTitle}>Esqueci-me da palavra passe</Text>
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
});

export default ForgotPasswordScreen;