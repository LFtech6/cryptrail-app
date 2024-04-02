import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const App = ({ navigation, route }) => {
  const { amountInCrypto, cryptoCurrency } = route.params;
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchPlatforms = async () => {
      setIsLoading(true);
      // Simulate network request
      setTimeout(() => {
        const data = {
          "platforms": [
            { "id": "1", "name": "Platform A", "feePercentage": 1.5, "url": "https://platforma.com" },
            { "id": "2", "name": "Platform B", "feePercentage": 1.0, "url": "https://platformb.com" },
            { "id": "3", "name": "Platform C", "feePercentage": 0.75, "url": "https://platformc.com" }
          ]
        };
        setPlatforms(data.platforms);
        setIsLoading(false);
      }, 1000);
    };

    fetchPlatforms();
  }, []);

  const renderItem = ({ item }) => {
    const finalAmount = amountInCrypto - (amountInCrypto * item.feePercentage / 100);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name} - Fee: {item.feePercentage}%</Text>
        <Text style={styles.itemText}>You get: {finalAmount.toFixed(6)} {cryptoCurrency}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('WebView', { url: item.url })}>
          <Text style={styles.buyButtonText}>Buy on {item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={platforms}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
