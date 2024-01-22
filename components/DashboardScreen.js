//DashboardScreen
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, StatusBar, View, ScrollView} from 'react-native';
import {responsiveWidth, responsiveScreenHeight } from 'react-native-responsive-dimensions';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.page}>
    <View>
    
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Image source={require('../assets/me2.png')} style={styles.user}/>
    </TouchableOpacity>
    
    <Text style={styles.title}>Olá, Rodrigo</Text>
    
    <View>
    
    <Text style={styles.tit}>My first coin Watchlist <Text>                                                + ···</Text></Text>
    
    <TouchableOpacity style={styles.tha}>
    <Text style={styles.select}>Market Cap</Text>
    <Image style={styles.arrow} source={require('../assets/setabaixo.png')}/>
    <Text style={styles.price}>      Price</Text>
    <Text style={styles.value}>24h %</Text>
    </TouchableOpacity>
    
    <ScrollView>

    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/bitcoin.png')} style={styles.icon}/>
    <Text style={styles.text}>Bitcoin{"\n"}
    <Text style={styles.marketc}>€733.90 B{"\n"}</Text></Text>
    <Text style={styles.preco}>   €38,258.24</Text>
    <Text style={styles.valor}>0.16%</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/ethereum.png')} style={styles.icone}/>
    <Text style={styles.text}>Ethereum{"\n"}
    <Text style={styles.marketc}>€273.13 B{"\n"}</Text></Text>
    <Text style={styles.preco}> €2,182.60</Text>
    <Text style={styles.valor}>4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/tether.png')} style={styles.icon}/>
    <Text style={styles.text}>USDt{"\n"}
    <Text style={styles.marketc}>€87.00 B{"\n"}</Text></Text>
    <Text style={styles.preco}>         €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/bnb.png')} style={styles.icon}/>
    <Text style={styles.text}>BNB{"\n"}
    <Text style={styles.marketc}>€43.74 B{"\n"}</Text></Text>
    <Text style={styles.preco}>           €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/solana.png')} style={styles.icon}/>
    <Text style={styles.text}>SOL{"\n"}
    <Text style={styles.marketc}>€37.13 B{"\n"}</Text></Text>
    <Text style={styles.preco}>           €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/xrp.png')} style={styles.icon}/>
    <Text style={styles.text}>XRP{"\n"}
    <Text style={styles.marketc}>€27.56 B{"\n"}</Text></Text>
    <Text style={styles.preco}>           €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/cardano.png')} style={styles.icon}/>
    <Text style={styles.text}>ADA{"\n"}
    <Text style={styles.marketc}>€16.83 B{"\n"}</Text></Text>
    <Text style={styles.preco}>          €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/usdcoin.png')} style={styles.icon}/>
    <Text style={styles.text}>USDC{"\n"}
    <Text style={styles.marketc}>€23.64 B{"\n"}</Text></Text>
    <Text style={styles.preco}>        €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.namebox}>
    <Image source={require('../assets/dogecoin.png')} style={styles.icon}/>
    <Text style={styles.text}>DOGE{"\n"}
    <Text style={styles.marketc}>€11.55 B{"\n"}</Text></Text>
    <Text style={styles.preco}>        €0.9175</Text>
    <Text style={styles.valor}>  4.02%</Text>
    </TouchableOpacity>
    
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>

    </ScrollView>
    </View>
    </View>
    </View>
    )};
    
    const styles = StyleSheet.create({
      page: {
        backgroundColor: '#FFDE67',
      },
      user: {
        height: responsiveScreenHeight(5),
        width: responsiveWidth(180),
        marginTop: 50,
        resizeMode: 'contain',
      },
      title: {
        textAlign: 'left',
        marginHorizontal: 20,
        fontSize: 35,
        color: '#000',
        marginTop: 60,
      },
      tit: {
        fontSize: 17,
        paddingHorizontal: 9,
        marginTop: 40,
      },
      tit: {
        fontSize: 17,
        paddingHorizontal: 9,
        marginTop: 40,
      },
      arrow: {
        width: 15,
        height: 12,
        resizeMode: 'contain',
        marginTop: 3,
        paddingHorizontal: 10,
      },
      tha: {
        flexDirection: 'row', 
        marginTop: 20,
        paddingHorizontal: 10,
      },
      price: {
        paddingHorizontal: 110 ,
      },
      value: {
        fontSize: 14,
      },
      preco: {
        marginTop: -11,
        paddingHorizontal: 80,
      },
      valor: {
        marginTop: -11,
        paddingHorizontal: 30,
      },
      namebox: {
        flexDirection: 'row', 
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
        textAlign: 'left',
        marginTop: 15,
        alignItems: 'center',
      },
      icon: {
        alignItems: 'flex-end',
        height: 35,
        width: 35,
      },
      icone: {
        alignItems: 'flex-end',
        height: 40,
        width: 35,
      },
      text: {
        fontSize: 13,
        paddingHorizontal: 10,
      },
      marketc: {
        marginTop: 15,
        fontSize: 6,
      },
    });
    
    export default DashboardScreen;