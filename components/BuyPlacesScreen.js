//BuyPlacesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Linking, Image } from 'react-native';
import axios from 'axios';
import { responsiveWidth, responsiveFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions";

const BuyPlacesPage = ({ route }) => {
  const { cryptoCurrency, baseCurrency, convertedAmount, baseAmount } = route.params;
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      setIsLoading(true);
      try {
        const url = `http://192.168.8.153:3000/exchanges?currency=${cryptoCurrency}`;
        const response = await axios.get(url);
        if (response.data.length > 0) {
          let exchangesWithFees = response.data.map(exchange => {
            const feePercentage = Math.random() * (3.35 - 0.01) + 0.01 ;
            const feeAmount = (feePercentage * baseAmount)  / 100;
            return {
              ...exchange,
              feePercentage,
              feeAmount
            };
          });
          // Sort exchanges from lower to higher total amount
          exchangesWithFees = exchangesWithFees.sort((a, b) => (a.feeAmount + Number(baseAmount)) - (b.feeAmount + Number(baseAmount)));
          setExchanges(exchangesWithFees);
        } else {
          setExchanges([]);
        }
      } catch (error) {
        console.error('Error fetching exchanges for currency:', cryptoCurrency, error);
      }
      setIsLoading(false);
    };

    fetchExchanges();
  }, [cryptoCurrency, baseAmount]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!exchanges.length) {
    return <Text>No exchanges available for {cryptoCurrency.toUpperCase()}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Buy {convertedAmount} {cryptoCurrency.toUpperCase()} with {baseCurrency.toUpperCase()}</Text>
      {exchanges.map((exchange, index) => (
        <View key={index} style={styles.exchangeContainer}>
          <View style={{ flexDirection: 'row'}}>
          <Image
            style={styles.logo}
            source={{ uri: exchange.image_url }}
          />
          <Text style={styles.exchangeName}>{exchange.name}</Text>
          </View>
          <Text style={styles.fee}>Fee: {(exchange.feePercentage).toFixed(2)}%</Text>
          <Text style={styles.total}>Total in {baseCurrency.toUpperCase()}: {((Number(baseAmount) + exchange.feeAmount).toFixed(2))}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(exchange.url)}>
            <Text style={styles.link}>Go to {exchange.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};  

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    marginTop: responsiveScreenHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exchangeContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  exchangeName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginTop: 11,
    marginLeft: 10,
  },
  link: {
    color: 'blue',
    marginTop: 5,
  },
  fee: {
    fontSize: responsiveFontSize(1.8),
    marginTop: 5,
  },
  total: {
    fontSize: responsiveFontSize(1.8),
    marginTop: 5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default BuyPlacesPage;
