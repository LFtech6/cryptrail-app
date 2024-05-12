//MarketScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import {
  responsiveWidth,
  responsiveScreenHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useUser } from "../UserContext";

const MarketScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Coins");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortDescending, setSortDescending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(300)).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const { user, setUser } = useUser();

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const formattedQuery = text.toLowerCase();
      const newItems = items.filter((item) =>
        item.name.toLowerCase().includes(formattedQuery)
      );
      setFilteredItems(newItems);
    } else {
      setFilteredItems(items);
    }
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

  useEffect(() => {
    fetchDataFromApi(selectedTab);
  }, [selectedTab]);

  const fetchDataFromApi = async (endpoint) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://192.168.1.191:3000/${endpoint}`);
      let json = await response.json();
      if (endpoint === "Exchanges") {
        json = json.sort((a, b) => b.trust_score - a.trust_score);
      } else if (endpoint === "Coins") {
        json = sortData(json);
      }
      setData(json);
      setItems(json);
      setFilteredItems(json);
    } catch (error) {
      setError(`Failed to fetch ${endpoint}. Please try again later.`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCoinItem = ({ item, index }) => {
    const priceChange = parseFloat(item.price_change_percentage_24h);

    return (
      <View style={styles.listItem}>
        <Text style={styles.coinNumber}>{index + 1}</Text>
        <Image source={{ uri: item.image_url }} style={styles.coinImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.coinCap}>€ {item.market_cap}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.coinPrice}>€{item.current_price}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.variation,
              { color: priceChange < 0 ? "red" : "green" },
            ]}
          >
            {isNaN(priceChange) ? "N/A" : priceChange.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.navigate("Landing");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const sortData = (coins) => {
    return coins.sort((a, b) => {
      if (sortDescending) {
        return b.market_cap - a.market_cap;
      } else {
        return a.market_cap - b.market_cap;
      }
    });
  };

  const toggleSortOrder = () => {
    setSortDescending(!sortDescending);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderExchangeItem = ({ item, index }) => {
    const priceChange = parseFloat(item.trade_volume_24h_btc);

    return (
      <View style={styles.listItem}>
        <Text style={styles.coinNumber}>{index + 1}</Text>
        <Image source={{ uri: item.image_url }} style={styles.exchangeImage} />
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.exchangeName}>{item.name}</Text>
          </TouchableOpacity>
          <Text style={styles.exchangeTrade}>{item.trust_score}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.variationE]}>
            {isNaN(priceChange) ? "N/A" : priceChange.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
      <FlatList
        data={filteredItems}
        renderItem={
          selectedTab === "Coins" ? renderCoinItem : renderExchangeItem
        }
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };
  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: menuAnimation }],
          },
        ]}
      >
          <View style={styles.content1}>
          <Text style={styles.welcome}>Hi, {user ? user.username : "Guest"}</Text>
          <Text style={{ paddingLeft: 2,}}>{user.email}</Text>
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
              <Image source={require("../assets/site.png")} style={styles.socialM}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/rodrigo.lf6')}>
              <Image source={require("../assets/instagram.png")} style={styles.socialM}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/LFtech6')}>
              <Image source={require("../assets/github.png")} style={styles.socialM}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/rodrigo-lopes-ferreira-238906236/')}>
              <Image source={require("../assets/linkedin.png")} style={styles.socialM}/>
            </TouchableOpacity>
          </View> 
          </View>
        </Animated.View>
        <Animated.View
        style={[
          { flex: 1 },
          {
            transform: [{ translateX: contentAnimation }],
          },
        ]}
      >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Market</Text>
        <TouchableOpacity style={styles.hamMenu} onPress={toggleMenu}>
              <Image
                style={styles.imageStyle}
                source={require("../assets/profile.png")}
              />
            </TouchableOpacity>
      </View>
      <Separator />
      <KeyboardAvoidingView>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchArea}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              value={searchTerm}
              onChangeText={handleSearch}
            />
            <TouchableOpacity style={styles.toggleButton} onPress={toggleModal}>
              <Image
                source={require("../assets/Slider.png")}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          </View>

          <Modal
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSelectedTab("Exchanges");
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Exchanges</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSelectedTab("Coins");
                  toggleModal();
                }}
              >
                <Text style={styles.modalText}>Coins</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text style={styles.headerNumber}>#</Text>
        {selectedTab === "Coins" ? (
          <>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={toggleSortOrder}
            >
              <Text style={styles.headerTitle}>Market Cap</Text>
              <Image
                source={require("../assets/setabaixo.png")}
                style={styles.organizer}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Price</Text>
            <Text style={styles.headerPercentage}>30d%</Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={toggleSortOrder}
            >
              <Text style={styles.headerTitle}> Rating</Text>
              <Image
                source={require("../assets/setabaixo.png")}
                style={styles.organizer}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}></Text>
            <Text style={styles.headerVolumeE}>24h Vol</Text>
          </>
        )}
      </View>
      {renderContent()}
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
    backgroundColor: "#fff",
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
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveScreenHeight(1),
    marginTop: responsiveScreenHeight(2),
  },
  searchArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingLeft: responsiveWidth(5),
    fontSize: responsiveFontSize(2),
  },
  toggleButton: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: 10,
    marginLeft: -responsiveWidth(10),
  },
  toggleButtonText: {
    fontSize: responsiveFontSize(2),
    color: "#333",
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: "#e0e0e0",
    elevation: 5,
    position: "absolute",
    top: 170,
    right: 10,
  },
  modalButton: {
    padding: 10,
   
  },
  modalText: {
    textAlign: "center",
   
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveWidth(2),
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  coinNumber: {
    fontSize: responsiveFontSize(1.5),
    width: responsiveWidth(7),
    textAlign: "center",
  },
  coinImage: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    marginRight: responsiveWidth(2),
  },
  coinName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#333",
  },
  coinCap: {
    fontSize: responsiveFontSize(0.9),
    color: "#333",
    marginTop: responsiveScreenHeight(0.5),
  },
  coinPrice: {
    fontSize: responsiveFontSize(1.6),
    color: "#333",
    marginLeft: responsiveWidth(7),
  },
  variation: {
    fontSize: responsiveFontSize(1.6),
    color: "#333",
    marginLeft: responsiveWidth(12),
  },
  exchangeImage: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    marginRight: responsiveWidth(2),
  },
  exchangeName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#333",
  },
  exchangeTrade: {
    fontSize: responsiveFontSize(1.6),
    color: "#333",
    marginLeft: responsiveWidth(1),
  },
  variationE: {
    fontSize: responsiveFontSize(1.6),
    color: "#333",
    marginLeft: responsiveWidth(19),
  },
  headerNumber: {
    fontSize: responsiveFontSize(1.8),
    width: responsiveWidth(2),
    textAlign: "center",
  },
  headerTitle: {
    fontSize: responsiveFontSize(1.8),
    marginRight: responsiveWidth(2),
  },
  headerPercentage: {
    fontSize: responsiveFontSize(1.8),
  },
  headerVolume: {
    fontSize: responsiveFontSize(1.8),
  },
  headerVolumeE: {
    fontSize: responsiveFontSize(1.8),
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: responsiveWidth(2),
  },
  organizer: {
    width: 10,
    height: 10,
    marginLeft: 5,
  },
});

export default MarketScreen;
