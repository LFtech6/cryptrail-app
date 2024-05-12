//NewsScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { useUser } from "../UserContext";

const NewsScreen = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(300)).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;
  const { user, setUser } = useUser();

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

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.191:3000/news");
      setNewsArticles(response.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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

  const openLink = async (url) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  const Seperator = () => <View style={styles.Seperator} />;

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
        <Text style={styles.title}>News</Text>
        <TouchableOpacity style={styles.hamMenu} onPress={toggleMenu}>
              <Image
                style={styles.imageStyle}
                source={require("../assets/profile.png")}
              />
            </TouchableOpacity>
      </View>
      <Seperator />
      <ScrollView
        style={styles.newsScroll}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
      >
        {newsArticles.map((article, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openLink(article.link)}
            style={index === 0 ? styles.featuredArticle : styles.article}
          >
            <Image
              source={{
                uri: article.image_url || "https://via.placeholder.com/120",
              }}
              style={index === 0 ? styles.featuredImage : styles.articleImage}
            />
            <Text
              style={index === 0 ? styles.featuredTitle : styles.articleTitle}
            >
              {article.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
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
  Seperator: {
    height: 1,
    backgroundColor: "#FFD464",
    width: "100%",
    marginVertical: 8,
  },
  newsScroll: {
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 60,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  featuredArticle: {
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderColor: "#FFD464",
    borderWidth: 1,
  },
  article: {
    borderColor: "#FFD464",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
  },
  featuredImage: {
    borderWidth: 1,
    borderColor: "#FFD464",
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  featuredTitle: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
    textAlign: "center",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
});

export default NewsScreen;
