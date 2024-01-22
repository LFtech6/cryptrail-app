//CoinsScreen
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const CoinsScreen = ({ navigation }) => {
  return (
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Image source={require('../assets/me2.png')} style={styles.user}/>
    </TouchableOpacity>
    <Text style={styles.title}>Coins</Text>
    <Text style={styles.Seperator}/>
    <ScrollView>
    <View style={styles.coinbox}>
    <Text>#1</Text>
    <TouchableOpacity onPress={() => Alert.alert("Bitcoin")}>
    <Image source={require('../assets/bitcoin.png')} style={styles.sent} />
    </TouchableOpacity>
    </View>
    <View>
    <Text>#2</Text>
    <TouchableOpacity onPress={() => Alert.alert("Ethereum")}>
    <Image source={require('../assets/ethereum.png')} style={styles.sent} />
    </TouchableOpacity>
    </View>
    <View>
    <Text>#3</Text>
    <TouchableOpacity onPress={() => Alert.alert("Dogecoin")}>
    <Image source={require('../assets/dogecoin.png')} style={styles.sent} />
    </TouchableOpacity>
    </View>
    </ScrollView>
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
    
    export default CoinsScreen;