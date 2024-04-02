// DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const Dashboard = ({ navigation }) => {
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("1");
  const [baseCurrency, setBaseCurrency] = useState('eur');
  const [targetCurrency, setTargetCurrency] = useState('btc');
  const [result, setResult] = useState("");
  const [conversionType, setConversionType] = useState('cryptoToFiat', 'fiatToCrypto');

  useEffect(() => {
    const backendPort = '57288';
    fetchData(backendPort);
  }, [conversionType]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:62998/convert');
      if (!response.ok) {
        const text = await response.text(); // Gets the response body as text
        throw new Error(`Server responded with ${response.status}: ${text}`);
      }
      const jsonData = await response.json();
      if (jsonData) {
        setRates(jsonData);
      } else {
        throw new Error('Rates data is not available');
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (!isLoading && rates && baseCurrency && targetCurrency) {
      convertCurrency();
    }
  }, [inputValue, baseCurrency, targetCurrency, rates]);

  const convertCurrency = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:62998/convert?base=${baseCurrency}&target=${targetCurrency}&amount=${inputValue}`);
      if (!response.ok) {
        const text = await response.text(); // Gets the response body as text
        throw new Error(`Server responded with ${response.status}: ${text}`);
      }
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult("Conversion error");
      }
    } catch (error) {
      console.error("Conversion error: ", error);
      setResult("Unavailable");
    } finally {
      setIsLoading(false);
    }
  };
  


  const getFilteredRates = (type) => {
    return Object.entries(rates)
      .filter(([_, value]) => value.type === type)
      .map(([key, value]) => (
        <Picker.Item key={key} label={value.name} value={key} />
      ));
  };

  const fiatCurrencyOptions = getFilteredRates('fiat');
  const cryptoCurrencyOptions = getFilteredRates('crypto');

  const handleSegmentChange = (index) => {
    const types = ['cryptoToFiat', 'fiatToCrypto'];
    setConversionType(types[index]);
    setBaseCurrency('eur');
    setTargetCurrency('btc');
  };

  
  return (
    <ScrollView style={styles.page}>
    <Text style={styles.title}>Dashboard</Text>
    <View style={styles.container}>

      <SegmentedControl
        values={['Fiat to Crypto', 'Crypto to Fiat']}
        selectedIndex={0}
        onChange={(event) => handleSegmentChange(event.nativeEvent.selectedSegmentIndex)}
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        keyboardType="numeric"
        placeholder="Enter amount"
      />

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={targetCurrency}
        style={styles.picker}
        onValueChange={setTargetCurrency}
      >
        {(conversionType === 'cryptoToFiat') ? cryptoCurrencyOptions : fiatCurrencyOptions}
      </Picker>

      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={baseCurrency}
        style={styles.picker}
        onValueChange={setBaseCurrency}
      >
        {(conversionType === 'fiatToCrypto') ? cryptoCurrencyOptions: fiatCurrencyOptions}
      </Picker>

      <Text style={styles.result}>
        {inputValue} {rates[targetCurrency]?.unit} is approximately {result} {rates[baseCurrency]?.unit}
      </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BuyPlaces', { amountInCrypto: result, amountcryptoCurrency: targetCurrency})}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    page: { 
      marginTop: 20,
      marginBottom: 80,
    },
    title: {
      borderColor: '#C7C7CC',
      fontSize: 24,
      textAlign: 'center',
      color: '#1C1C1E',
      padding: 15,
      marginTop: 20,
      backgroundColor: '#F5F5F7', 
    },  
    container: {
      flex: 1,
      backgroundColor: '#F5F5F7', 
      padding: 20,
      paddingTop: 70,
    },
    input: {
      width: '100%',
      padding: 15,
      fontSize: 18,
      borderColor: '#C7C7CC', 
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#FFFFFF', 
      marginBottom: 20,
      color: '#1C1C1E', 
      marginTop: 20,
    },
    picker: {
      width: '100%',
      padding: 15,
      borderColor: '#C7C7CC',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      color: '#1C1C1E',
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 16,
      color: '#1C1C1E',
      marginBottom: 5,
    },
    result: {
      fontSize: 18,
      color: '#1C1C1E',
      padding: 15,
      width: '100%',
      textAlign: 'center',
      borderColor: '#C7C7CC',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      marginBottom: 20,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: '#007AFF', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      color: '#FFFFFF', 
      fontWeight: '600',
    },
    segmentedControl: {
      width: '100%',
      height: 35,
      marginBottom: 20,
    },
  });

export default Dashboard;
