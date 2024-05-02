import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import { useUser } from "../UserContext";

const Dashboard = ({ navigation }) => {
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("1");
  const [baseCurrency, setBaseCurrency] = useState("eur");
  const [targetCurrency, setTargetCurrency] = useState("btc");
  const [result, setResult] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(responsiveWidth(75))).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrencyType, setSelectedCurrencyType] = useState("");
  const { user, setUser } = useUser();

  console.log(
    `Converting ${inputValue} from ${baseCurrency} to ${targetCurrency}`
  );

  const swapCurrencies = () => {
    setBaseCurrency((prevBase) => {
      setTargetCurrency(prevBase);
      return targetCurrency;
    });
  };

  useEffect(() => {
    const fetchInitialRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://10.0.35.193:3000/rates");
        const jsonData = await response.json();
        setRates(jsonData);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialRates();
  }, []);

  const toggleMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: menuVisible ? responsiveWidth(75) : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnimation, {
        toValue: menuVisible ? 0 : -responsiveWidth(75),
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setMenuVisible(!menuVisible);
  };

  const showCurrencyOptions = (type) => {
    setSelectedCurrencyType(type);
    setModalVisible(true);
  };
  const selectCurrency = (currency) => {
    if (selectedCurrencyType === "base") {
      setBaseCurrency(currency);
    } else {
      setTargetCurrency(currency);
    }
    setModalVisible(false);
  };

  const convertCurrency = async () => {
    setIsLoading(true);
    try {
      const query = `base=${baseCurrency}&target=${targetCurrency}&amount=${inputValue}`;
      const response = await fetch(`http://10.0.35.193:3000/convert?${query}`);
      const data = await response.json();
      console.log(`http://10.0.35.193:3000/convert?${query}`);
      console.log(data);

      if (data.convertedAmount) {
        setResult(data.convertedAmount);
      } else {
        setResult("Unavailable");
        Alert.alert(
          "Conversion Error",
          "Unable to convert currency. Please try again later."
        );
      }
    } catch (error) {
      console.error("Conversion error: ", error);
      setResult("Unavailable");
      Alert.alert(
        "Conversion Error",
        "An error occurred during currency conversion."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && rates && baseCurrency && targetCurrency && inputValue) {
      convertCurrency();
    }
  }, [inputValue, baseCurrency, targetCurrency, rates]);

  const Seperator = () => <View style={styles.Seperator} />;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <Seperator />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.view}>
          <Text style={styles.welcome}>
            Welcome, {user ? user.username : "Guest"}!
          </Text>
          <View style={styles.inpuT}>
            <Text style={styles.inputTitle}>
              Write the value you want to Convert
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setInputValue}
              value={inputValue}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
          </View>
          <View style={styles.dropCont}>
            <TouchableOpacity
              style={styles.dropdownF}
              onPress={() => showCurrencyOptions("base")}
            >
              <Text style={styles.dropText}>
                {rates[baseCurrency]?.name || "FIAT"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={swapCurrencies}>
              <Image
                source={require("../assets/convert.png")}
                style={styles.change}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownC}
              onPress={() => showCurrencyOptions("target")}
            >
              <Text style={styles.dropText}>
                {rates[targetCurrency]?.name || "CRYPTO"}
              </Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text
              style={styles.resultText}
            >{`${inputValue} ${baseCurrency.toUpperCase()} is approximately ${result} ${targetCurrency.toUpperCase()}`}</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("BuyPlaces", {
                amountInCrypto: result,
                cryptoCurrency: targetCurrency,
              })
            }
          >
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={Object.entries(rates)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item[0]}
                    style={styles.optionItem}
                    onPress={() => selectCurrency(item[0])}
                  >
                    <Text style={styles.optionText}>{item[1].name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item[0]}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
    padding: 10,
  },
  logo: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    marginTop: responsiveScreenHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: responsiveWidth(0.3),
    marginTop: responsiveScreenHeight(5.8),
  },
  Seperator: {
    height: 1,
    backgroundColor: "#FFD464",
    width: "100%",
    marginVertical: 8,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  view: {
    marginTop: 60,
  },
  welcome: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    margin: 12,
    marginTop: -20,
  },
  inpuT: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  inputTitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    fontSize: responsiveFontSize(2),
    marginBottom: 20,
    width: 150,
    alignSelf: "center",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  dropCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdownF: {
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#ffffff",
    borderRadius: 63,
    paddingVertical: 30,
    padding: 5,
    width: 100,
    alignSelf: "flex-start",
    marginHorizontal: 50,
  },
  dropdownC: {
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#ffffff",
    borderRadius: 63,
    paddingVertical: 30,
    padding: 5,
    width: 100,
    alignSelf: "flex-end",
    marginHorizontal: 50,
  },
  dropText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  change: {
    width: 30,
    height: 30,
    marginTop: 25,
  },
  button: {
    backgroundColor: "#007bff", // A bright blue for the main action button
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
    width: 100,
    alignSelf: "center",
  },
  resultText: {
    fontSize: responsiveFontSize(1.7),
    color: "#333333",
    textAlign: "center",
    marginVertical: 20,
    marginTop: 120,
  },
  buttonText: {
    fontSize: responsiveFontSize(1.7),
    color: "#ffffff", // White text on the button for contrast
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    color: "#333333",
  },
});

export default Dashboard;
