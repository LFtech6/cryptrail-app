//GetStartedScreen.js
import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

const PaginationIndicator = ({ totalPages, currentPage }) => {
  return (
    <View style={styles.paginationWrapper}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationLine,
            currentPage === index && styles.paginationLineActive,
          ]}
        />
      ))}
    </View>
  );
};

const GetStartedScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    setCurrentPage(indexOfNextScreen);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <View style={[styles.slide, { width: width }]}>
          <View style={styles.alignCenter}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.stitle}>Cryptrail</Text>
            <Image
              source={require("../assets/adaptive-icon.png")}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={[styles.slide, { width: width }]}>
          <View style={styles.alignCenter}>
            <Text style={styles.title}>
              Leverage AI in your crypto journey.
            </Text>
            <Text style={styles.description}>
              There’s only a few apps with AI integrated focused on the crypto
              market, and Cryptrail is one of them.
            </Text>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 425, alignSelf: 'flex-end' }}>
              <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
                <Text style={styles.nextT}>Start</Text>
                <Image
                  source={require("../assets/next.png")}
                  style={styles.next}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <PaginationIndicator totalPages={2} currentPage={currentPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FFD464",
  },
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 100,
    fontSize: 43,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  stitle: {
    fontSize: 43,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  logo: {
    marginTop: 50,
    width: 350,
    height: 350,
    marginBottom: 20,
    alignSelf: "center",
  },
  description: {
    fontSize: 18,
    color: "#333",
    marginTop: 100,
    paddingHorizontal: 10,
  },
  next: {
    width: 22,
    height: 22,
    marginTop: 2,
    alignSelf: "flex-end",
  },
  nextT: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight: 36,
    marginTop: 10,
    marginBottom: -24,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  paginationLine: {
    width: width * 0.3,
    height: 4,
    backgroundColor: "#a9a9a9",
    marginHorizontal: 2,
  },
  paginationLineActive: {
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFD464",
  },
});

export default GetStartedScreen;
