import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { SegmentedButtons, ToggleButton } from 'react-native-paper';
import Icon1 from '../assets/bitcoin.png';
import Icon2 from '../assets/ethereum.png';
import Icon3 from '../assets/tether.png';
import Icon4 from '../assets/bnb.png';
import Icon5 from '../assets/xrp.png';
import Icon6 from '../assets/usdcoin.png';
import Icon7 from '../assets/solana.png';
import Icon8 from '../assets/cardano.png';
import Icon9 from '../assets/dogecoin.png';

const items = [
  { id: 1, icon: Icon1, text: 'Bitcoin' },
  { id: 2, icon: Icon2, text: 'Ethereum' },
  { id: 3, icon: Icon3, text: 'Tether' },
  { id: 4, icon: Icon4, text: 'BNB' },
  { id: 5, icon: Icon5, text: 'XRP' },
  { id: 6, icon: Icon6, text: 'USD Coin' },
  { id: 7, icon: Icon7, text: 'Solana' },
  { id: 8, icon: Icon8, text: 'Cardano' },
  { id: 9, icon: Icon9, text: 'Dogecoin' },
  { id: 1, icon: Icon1, text: 'Bitcoin' },
  { id: 2, icon: Icon2, text: 'Ethereum' },
  { id: 3, icon: Icon3, text: 'Tether' },
  { id: 4, icon: Icon4, text: 'BNB' },
  { id: 5, icon: Icon5, text: 'XRP' },
  { id: 6, icon: Icon6, text: 'USD Coin' },
  { id: 7, icon: Icon7, text: 'Solana' },
  { id: 8, icon: Icon8, text: 'Cardano' },
  { id: 9, icon: Icon9, text: 'Dogecoin' },
  { id: 1, icon: Icon1, text: 'Bitcoin' },
  { id: 2, icon: Icon2, text: 'Ethereum' },
  { id: 3, icon: Icon3, text: 'Tether' },
  { id: 4, icon: Icon4, text: 'BNB' },
  { id: 5, icon: Icon5, text: 'XRP' },
  { id: 6, icon: Icon6, text: 'USD Coin' },
  { id: 7, icon: Icon7, text: 'Solana' },
  { id: 8, icon: Icon8, text: 'Cardano' },
  { id: 9, icon: Icon9, text: 'Dogecoin' },
  { id: 1, icon: Icon1, text: 'Bitcoin' },
  { id: 2, icon: Icon2, text: 'Ethereum' },
  { id: 3, icon: Icon3, text: 'Tether' },
  { id: 4, icon: Icon4, text: 'BNB' },
  { id: 5, icon: Icon5, text: 'XRP' },
  { id: 6, icon: Icon6, text: 'USD Coin' },
  { id: 7, icon: Icon7, text: 'Solana' },
  { id: 8, icon: Icon8, text: 'Cardano' },
  { id: 9, icon: Icon9, text: 'Dogecoin' },
  
];

const Item = ({ icon, text }) => (
  <View style={styles.item}>
    <Image source={icon} style={styles.icon} />
    <Text>{text}</Text>
  </View>
);

const FavCoinsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
        <Text style={styles.title}>Choose your favorite coins</Text>
      </View>
      <ScrollView style={styles.scrollView}>
    {items.map((item, index) => {
      if (index % 3 === 0) {
        return (
          <View style={styles.row} key={index}>
            <Item {...items[index]} />
            {items[index + 1] && <Item {...items[index + 1]} />}
            {items[index + 2] && <Item {...items[index + 2]} />}
          </View>
        );
      }
      return null;
    })}
  </ScrollView>
  <View>
  <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
  <Text style={styles.underlinedText}>Let´s go!</Text>
  </TouchableOpacity>
  </View>
  </View>
  );
};

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
  title: {
    fontSize: 48,
    color: '#000',
  },  
  underlinedText: {
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  underText: {
    fontSize: 16,
  },
  scrollView: {
    height: 130,
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  item: {
    alignItems: 'center',
    width: '30%', // Approximately for 3 columns
  },
  icon: {
    width: 55,  // Set your desired width
    height: 55, // Set your desired height
  },
});

export default FavCoinsScreen;
