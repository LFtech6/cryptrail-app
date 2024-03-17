import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveWidth,
  responsiveScreenHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const MarketScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Coins');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataFromApi(selectedTab);
  }, [selectedTab]);

  const fetchDataFromApi = async (endpoint) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:51324/${endpoint}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(`Failed to fetch ${endpoint}. Please try again later.`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCoinItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.coinImage} />
      <Text style={styles.coinName}>{item.name}</Text>
      <Text style={styles.coinPrice}>$ {item.current_price}</Text>
      <Text style={styles.variation}>{item.price_change_percentage_24h?.toFixed(2)}%</Text>
    </View>
  );

  const renderExchangeItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.exchangeImage} />
      <Text style={styles.exchangeName}>{item.name}</Text>
    </View>
  );

  const renderContent = () => {
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
      <FlatList
        data={data}
        renderItem={selectedTab === 'Coins' ? renderCoinItem : renderExchangeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../assets/profile.png')} style={styles.user} />
      </TouchableOpacity>
      <Text style={styles.title}>Market</Text>
      <View style={styles.tabContainer}>
        {['Coins', 'Exchanges'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user: {
    height: responsiveScreenHeight(5),
    width: responsiveWidth(180),
    marginTop: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: responsiveScreenHeight(1),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: responsiveScreenHeight(1),
  },
  tab: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveScreenHeight(1),
    marginHorizontal: responsiveWidth(2),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: responsiveFontSize(2.2),
    color: '#aaa',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  coinImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(4),
  },
  coinName: {
    flex: 1,
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#333',
  },
  coinPrice: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    color: '#333',
    marginRight: responsiveWidth(4),
  },
  variation: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    color: '#333',
    marginRight: responsiveWidth(4),
  },
  errorText: {
    fontSize: responsiveFontSize(2),
    color: 'red',
    textAlign: 'center',
    marginTop: responsiveScreenHeight(2),
  },
  exchangeName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#333',
  },
  exchangeImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(4),
  },
  // Add any other styles you may need for additional elements
});


export default MarketScreen;
