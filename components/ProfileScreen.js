import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
    <Text style={styles.title}>Profile</Text>
    <View style={styles.profile}>    
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

export default ProfileScreen;