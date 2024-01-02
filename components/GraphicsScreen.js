import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const GraphicsScreen = ({ navigation }) => {
  return (
    <View>
    <Text style={styles.title}>UpDrop</Text>
    <View style={styles.upDrop}>    
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

export default GraphicsScreen;