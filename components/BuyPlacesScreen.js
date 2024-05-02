import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';

const BuyPlacesPage = ({ route }) => {
  const { cryptoCurrency } = route.params;
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://10.0.35.193:3000/exchanges?currency=${cryptoCurrency}`);
        console.log('Fetched exchanges:', response.data);
        if (response.data.length > 0) {
          setExchanges(response.data);
        } else {
          setExchanges([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exchanges for currency:', cryptoCurrency, error);
        setIsLoading(false);
      }
    };

    fetchExchanges();
  }, [cryptoCurrency]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Buy {}{cryptoCurrency.toUpperCase()}</Text>
      {exchanges.length ? (
        exchanges.map((exchange) => (
          <View key={exchange.id} style={styles.exchangeContainer}>
            <Text style={styles.exchangeName}>{exchange.name}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(exchange.url)}>
              <Text style={styles.link}>Go to {exchange.name}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noExchanges}>No exchanges available for {cryptoCurrency.toUpperCase()}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exchangeContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  exchangeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginTop: 5,
  },
});

export default BuyPlacesPage;
