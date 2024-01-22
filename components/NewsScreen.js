//NewsScreen
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const NewsScreen = ({ navigation }) => {
  return (
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Image source={require('../assets/me2.png')} style={styles.user} />
    </TouchableOpacity>
    <Text style={styles.title}>News</Text>
    <Text style={styles.Seperator}/>
    <View>
    </View>
    </View>
    )};
    
    const styles = StyleSheet.create({
      title: {
        textAlign: 'center',
        marginHorizontal: 20,
        fontSize: 35,
        color: '#000',
        marginTop: 60,
      },
      user: {
        height: responsiveScreenHeight(5),
        width: responsiveWidth(180),
        marginTop: 50,
        resizeMode: 'contain',
      },
      Seperator: {
        height: 0.5, 
        width: '100%', 
        backgroundColor: '#212121',
        marginTop: 20,
      },
    });
    
    export default NewsScreen;