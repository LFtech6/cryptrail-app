//TrailScreen
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const TrailScreen = ({ navigation }) => {
  return (
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Image source={require('../assets/me2.png')} style={styles.user}/>
    </TouchableOpacity>
    <Text style={styles.title}>Trail</Text>
    <Text style={styles.Seperator}/>
    <View style={styles.send}>
    <TextInput placeholder='Message'/>
    <TouchableOpacity>
    <Image source={require('../assets/seta.png')} style={styles.sent} />
    </TouchableOpacity>
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
      send: {
        flexDirection: 'row', 
        borderWidth: 0.5,
        borderRadius: 25,
        paddingVertical: 6,
        paddingHorizontal: 30, // Add horizontal padding
        marginTop: 590,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'left', 
      },
      sent: {
        height: 20,
        width: 20,
        marginHorizontal: 310,
      },
    });
    
    export default TrailScreen;