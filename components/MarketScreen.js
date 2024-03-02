import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { responsiveWidth, responsiveScreenHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const MarketScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Coins');

  const tabs = ['Coins', 'Exchanges'];

  const generateMockData = (prefix, count) => {
    return Array.from({ length: count }, (_, i) => ({
      key: `${prefix}_${i + 1}`,
      name: `${prefix} ${i + 1}`,
    }));
  };

  const coinsData = generateMockData('Coin', 20);
  const exchangesData = generateMockData('Exchange', 20);

  const renderContent = () => {
    switch (selectedTab) {
      case 'Coins':
        return <FlatList data={coinsData} renderItem={renderListItem} />;
      case 'Exchanges':
        return <FlatList data={exchangesData} renderItem={renderListItem} />;
    }
  };

  const renderListItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image source={require('../assets/me2.png')} style={styles.user} />
      </TouchableOpacity>
      <Text style={styles.title}>Market</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    height: responsiveScreenHeight(5),
    width: responsiveWidth(180),
    marginTop: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveFontSize(3.5),
    color: '#000',
    textAlign: 'center',
    marginVertical: responsiveScreenHeight(2),
  },
  tabsContainer: {
    flexDirection: 'row',
},
  tab: {
    paddingHorizontal: responsiveWidth(4),
    marginHorizontal: responsiveWidth(1),
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    color: '#aaa',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 25,
    marginBottom: 80,
},
  listItem: {
    backgroundColor: '#fff',
    padding: responsiveWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: responsiveFontSize(2),
    color: '#333',
  },
});

export default MarketScreen;
