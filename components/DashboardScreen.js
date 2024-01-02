import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View>
    <Text style={styles.title}>Dashboard</Text>
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

export default DashboardScreen;