import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const NewsScreen = ({ navigation }) => {
  return (
    <View>
    <Text style={styles.title}>News</Text>
    <View style={styles.news}>    
    </View>
    </View>
)};

const styles = StyleSheet.create({
title: {
  textAlign: 'center',
  fontSize: 35,
  color: '#000',
  marginTop: 40,
},
});

export default NewsScreen;