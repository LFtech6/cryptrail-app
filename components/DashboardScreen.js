//DashboardScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Linking,
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
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("FIAT");
  const [targetCurrency, setTargetCurrency] = useState("CRYPTO");
  const [result, setResult] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(300)).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const [selectedCurrencyType, setSelectedCurrencyType] = useState("");
  const [showBuyButton, setShowBuyButton] = useState(false);
  const { user } = useUser();
  const [conversionHistory, setConversionHistory] = useState([]);

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => navigation.navigate("Landing") },
      ],
      { cancelable: false }
    );
  };

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: isMenuVisible ? 300 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(contentAnimation, {
      toValue: isMenuVisible ? 0 : -300,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!isMenuVisible);
  };

  const fetchConversionHistory = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://192.168.1.191:3000/getConversions/${user.id}`);
      const data = await response.json();
      setConversionHistory(data.reverse());
    } catch (error) {
      console.error('Error fetching conversion history:', error);
    }
  };

  useEffect(() => {
    const fetchInitialRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://192.168.1.191:3000/rates");
        const jsonData = await response.json();
        setRates(jsonData);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialRates();
    fetchConversionHistory();
  }, [user]);

  const showCurrencyOptions = (type) => {
    setSelectedCurrencyType(type);
    setModalVisible(true);
  };

  const addToHistory = (base, target, baseAmount, targetAmount) => {
    const newHistory = [{ base, target, baseAmount, targetAmount }, ...conversionHistory];
    if (newHistory.length > 6) newHistory.pop();
    setConversionHistory(newHistory);
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
    setShowBuyButton(false);
    setResult("");
    setIsLoading(true);
    try {
      const query = `base=${baseCurrency}&target=${targetCurrency}&amount=${inputValue}`;
      const response = await fetch(`http://192.168.1.191:3000/convert?${query}`);
      const data = await response.json();

      if (data.convertedAmount) {
        setResult(data.convertedAmount);
        addToHistory(baseCurrency, targetCurrency, inputValue, data.convertedAmount);

        await fetch('http://192.168.1.191:3000/saveConversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            baseCurrency,
            targetCurrency,
            baseAmount: inputValue,
            targetAmount: data.convertedAmount,
          }),
        });

        setShowBuyButton(true);
        fetchConversionHistory();
      } else {
        setResult("Unavailable");
        Alert.alert("Conversion Error", "Unable to convert currency. Please try again later.");
      }
    } catch (error) {
      console.error("Conversion error: ", error);
      setResult("Unavailable");
      Alert.alert("Conversion Error", "An error occurred during currency conversion.");
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    setBaseCurrency((prevBase) => {
      setTargetCurrency(prevBase);
      return targetCurrency;
    });
  };

  const isInputValid = () => {
    return !isNaN(inputValue) && Number(inputValue) > 0;
  };

  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setInputValue(numericValue);
    setShowBuyButton(false);
    setResult("");
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Image source={require("../assets/convert.png")} style={styles.convertIcon} />
      <Text style={styles.historyText}>{`${item.base_amount} ${item.base_currency} is ${item.target_amount} ${item.target_currency}`}</Text>
    </View>
  );

  const Separator = () => <View style={styles.separator} />;
  const Seperators = () => <View style={styles.Seperators} />;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
        <View>
          <Text style={styles.welcome}>Hi, {user ? user.username : "Guest"}</Text>
          <Text style={{ paddingLeft: 2 }}>{user.email}</Text>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Text style={styles.text3}>Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.cryptrail.pt/support.html')}>
              <Text style={styles.text2}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.cryptrail.pt/terms.html')}>
              <Text style={styles.text2}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.text3}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.links}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.cryptrail.pt')}>
              <Image source={require("../assets/site.png")} style={styles.socialM} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/rodrigo.lf6')}>
              <Image source={require("../assets/instagram.png")} style={styles.socialM} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/LFtech6')}>
              <Image source={require("../assets/github.png")} style={styles.socialM} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/rodrigo-lopes-ferreira-238906236/')}>
              <Image source={require("../assets/linkedin.png")} style={styles.socialM} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      <Animated.View style={[{ flex: 1 }, { transform: [{ translateX: contentAnimation }] }]}>
        <View style={{ flexDirection: "row" }}>
          <Image source={require("../assets/adaptive-icon.png")} style={styles.logo} />
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity style={styles.hamMenu} onPress={toggleMenu}>
            <Image style={styles.imageStyle} source={require("../assets/profile.png")} />
          </TouchableOpacity>
        </View>
        <Separator />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.view}>
            <View style={styles.convert}>
              <View style={styles.dropCont}>
                <TouchableOpacity style={styles.dropdownF} onPress={() => showCurrencyOptions("base")}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleInputChange}
                      value={inputValue}
                      keyboardType="numeric"
                      placeholder="Enter amount"
                    />
                    <Text style={styles.dropText}>{rates[baseCurrency]?.name || "FIAT"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Seperators />
                <TouchableOpacity onPress={swapCurrencies}>
                  <Image source={require("../assets/convert.png")} style={styles.change}></Image>
                </TouchableOpacity>
                <Seperators />
              </View>
              <View style={styles.dropCont}>
                <TouchableOpacity style={styles.dropdownC} onPress={() => showCurrencyOptions("target")}>
                  <Text style={styles.dropText}>{rates[targetCurrency]?.name || "CRYPTO"}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isInputValid() && (
              <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
                <Text style={styles.convertButtonText}>Convert</Text>
              </TouchableOpacity>
            )}
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.resultText}>
                {`${inputValue} ${baseCurrency.toUpperCase()} is approximately ${result} ${targetCurrency.toUpperCase()}`}
              </Text>
            )}
            {showBuyButton && (
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("BuyPlaces", {
                    cryptoCurrency: targetCurrency,
                    baseCurrency: baseCurrency,
                    convertedAmount: result,
                    baseAmount: inputValue
                  })
                }
              >
                <Text style={styles.buttonText}>Buy</Text>
              </TouchableOpacity>
            )}
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
                    <TouchableOpacity key={item[0]} style={styles.optionItem} onPress={() => selectCurrency(item[0])}>
                      <Text style={styles.optionText}>{item[1].name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item[0]}
                />
              </View>
            </View>
          </Modal>
          <Separator />
          <Text style={styles.last}>Last Conversions</Text>
          <View style={styles.historyContainer}>
            <FlatList
              data={conversionHistory.slice(0, 6)}
              renderItem={renderHistoryItem}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              style={{ marginBottom: 20 }}
            />
            {conversionHistory.length > 6 && (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => navigation.navigate("FullHistory", { history: conversionHistory, userId: user.id })}
              >
                <Text style={styles.seeMoreText}>See more</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#FFD464",
    width: "100%",
    marginVertical: 8,
  },
  container: {
    flex: 1,
    marginBottom: 80,
    padding: 10,
    backgroundColor: "white",
  },
  hamMenu: {
    position: "absolute",
    right: 0,
    top: 31,
    padding: 20,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#E4E3E3',
    width: 300,
    height: '100%',
    right: 0,
    padding: 20,
    zIndex: 2,
  },
  welcome: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginTop: 70,
  },
  content: {
    marginTop: 10,
    paddingTop: 40,
  },
  box: {
    padding: 10,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: "#D3D3D3",
  },
  text1: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text2: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text3: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    color: "white",
  },
  links: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    marginTop: 100,
  },
  socialM: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
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
  Seperators: {
    height: 1,
    backgroundColor: "#000",
    width: "40%",
    marginVertical: 8,
  },
  view: {
    marginTop: 60,
  },
  convert: {
    justifyContent: "center",
    marginBottom: 30,
  },
  dropCont: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  dropdownF: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#EFEFEF",
    borderRadius: 17,
    paddingVertical: 15,
    width: 370,
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: -30,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 5,
    fontSize: 14,
  },
  dropdownC: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#EFEFEF",
    borderRadius: 17,
    paddingVertical: 15,
    width: 370,
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 30,
  },
  dropText: {
    fontWeight: "bold",
    textAlign: "right",
    paddingHorizontal: 20,
    fontSize: 14,
  },
  change: {
    width: 30,
    height: 30,
    marginTop: -5,
  },
  convertButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: 90,
    alignSelf: "center",
    marginTop: -20,
    marginBottom: 40,
  },
  convertButtonText: {
    fontSize: responsiveFontSize(1.7),
    color: "#ffffff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: 70,
    alignSelf: "center",
  },
  resultText: {
    fontSize: responsiveFontSize(1.7),
    color: "#333333",
    textAlign: "center",
    marginVertical: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: responsiveFontSize(1.7),
    color: "#ffffff",
    fontWeight: "bold",
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
  last: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  historyItem: {
    flex: 1,
    margin: 5,
    padding: 20,
    marginBottom: -15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  convertIcon: {
    width: 20,
    height: 20,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  historyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  seeMoreButton: {
    padding: 10,
    alignItems: "flex-end",
    position: 'absolute',
    right: 10,
    paddingTop: 30,
  },
  seeMoreText: {
    color: "#0042A5",
    fontSize: 13,
  },
});

export default Dashboard;
