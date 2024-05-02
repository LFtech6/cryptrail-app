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

const NewsScreen = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(responsiveWidth(75))).current;
  const contentAnimation = useRef(new Animated.Value(0)).current;

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
      const response = await axios.get("http://10.0.35.193:3000/news");
      setNewsArticles(response.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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

  const toggleMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: menuVisible ? responsiveWidth(75) : 0, // Slide in menu or slide out
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnimation, {
        toValue: menuVisible ? 0 : -responsiveWidth(75), // Shift content left or back to original position
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setMenuVisible(!menuVisible);
  };

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
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>News</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
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
  },
  article: {
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
