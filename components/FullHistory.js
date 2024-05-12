//FullHistory.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert
} from 'react-native';
import { responsiveScreenHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'axios';

const FullHistory = ({ route, navigation }) => {
  const { history, userId } = route.params;
  const [currentHistory, setCurrentHistory] = React.useState(history);

  console.log(`Received userId: ${userId}`);

  const handleDeleteHistory = async () => {
    const parsedUserId = parseInt(userId, 10);
    console.log(`Parsed userId: ${parsedUserId}`);
    if (isNaN(parsedUserId)) {
      Alert.alert("Error", "Invalid user ID format.");
      return;
    }

    try {
      const response = await axios.delete(`http://192.168.1.191:3000/conversions/${parsedUserId}`);
      if (response.status === 200) {
        Alert.alert("Success", "Conversion history deleted successfully.");
        setCurrentHistory([]);
        navigation.navigate('Dashboard0');
      } else if (response.status === 404) {
        Alert.alert("Info", "No conversion history found to delete.");
      } else {
        Alert.alert("Error", "Unexpected error occurred.");
      }
    } catch (error) {
      console.error('Delete history error:', error);
      Alert.alert("Error", `Failed to delete conversion history: ${error.response?.data?.message || error.message}`);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {`${item.base_amount ?? '0'} ${item.base_currency?.toUpperCase() ?? 'UNKNOWN'} is ${item.target_amount ?? '0'} ${item.target_currency?.toUpperCase() ?? 'UNKNOWN'}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversion History</Text>
      <FlatList
        data={currentHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Delete History"
          onPress={handleDeleteHistory}
          color="#ff5c5c"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveScreenHeight(2),
    backgroundColor: 'white',
  },
  title: {
    marginTop: responsiveScreenHeight(4),
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  listContent: {
    paddingHorizontal: responsiveScreenHeight(2),
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: responsiveScreenHeight(2),
    marginVertical: responsiveScreenHeight(1),
    borderRadius: responsiveScreenHeight(1),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemText: {
    fontSize: responsiveFontSize(2),
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#FFD464',
    padding: responsiveScreenHeight(2),
    marginHorizontal: responsiveScreenHeight(2),
    borderRadius: responsiveScreenHeight(1),
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(2),
  }
});

export default FullHistory;
