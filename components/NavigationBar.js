import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const NavigationBar = ({ navigation }) => {
  return (
    <View>
    <Text style={styles.title}>Navigation</Text>
    <View style={styles.dashboard}>    
    </View>
    </View>
)};

const styles = StyleSheet.create({
title: {
  textAlign: 'center',
  fontSize: 35,
  color: '#000',
  marginTop: 50,
},
});

export default NavigationBar;
