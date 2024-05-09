import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { responsiveScreenHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const FullHistory = ({ route, navigation }) => {
  const { history } = route.params;

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
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
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
});

export default FullHistory;
