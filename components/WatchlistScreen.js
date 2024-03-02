import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, responsiveScreenWidth, responsiveScreenHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const WatchlistScreen = ({ navigation }) => {
  // Sample list of coins
  const initialCoins = [
    { name: 'Bitcoin', image: require('../assets/bitcoin.png') },
    { name: 'Ethereum', image: require('../assets/ethereum.png') },
    { name: 'Tether USDt', image: require('../assets/tether.png') },
    { name: 'BNB', image: require('../assets/bnb.png') },
    { name: 'Solana', image: require('../assets/solana.png') },
    { name: 'XRP', image: require('../assets/xrp.png') },
    { name: 'Cardano', image: require('../assets/cardano.png') },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState(initialCoins);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredCoins(initialCoins);
    } else {
      const filtered = initialCoins.filter(coin => coin.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredCoins(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground}>
        <Image source={require('../assets/cryptrail.png')} style={styles.cryptrail} />
        <View style={styles.begin}>
          <Text style={styles.title}>Watchlist</Text>
          <Text style={styles.desc}>Select your favorite coins</Text>
        </View>
      </View>

      <View style={styles.search}>
        <Image source={require('../assets/lupa.png')} style={styles.glove} />
        <TextInput
          placeholder="Search Coins..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchInput}
        />
      </View>

      <ScrollView style={styles.scroll}>
        {filteredCoins.map((coin, index) => (
          <TouchableOpacity key={index} style={styles.namebox}>
            <Image source={coin.image} style={styles.icon} />
            <Text style={styles.text}>{coin.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard0")}>
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
    backgroundColor: '#FFD464',
    width: '100%',
    height: '43%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    paddingHorizontal: 20, 
  },
  cryptrail: {
    height: responsiveScreenHeight(3.5),
    width: responsiveScreenHeight(80),
    resizeMode: 'contain',
    marginBottom: 69,
  },
  begin: {
    marginBottom: 87,
  },
  title: {
    fontSize: 48,
    color: '#000',
  },
  desc: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  scroll: {
    marginBottom: 10,
  },
  search: {
    marginTop: 20,
    flexDirection: 'row', 
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
  },
  glove: {
    marginHorizontal: 5,
    height: 20,
    width: 20,
  },
  namebox: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
    textAlign: 'left',
    marginTop: 15,
    alignItems: 'center',
  },
  icon: {
    height: 35,
    width: 35,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  underlinedText: {
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default WatchlistScreen;