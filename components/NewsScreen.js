import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity, Linking,} from 'react-native';
import axios from 'axios';

const NewsScreen = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/news');
      setNewsArticles(response.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
  }, []);

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" style={styles.loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.newsScroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {newsArticles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={index === 0 ? styles.featuredArticle : styles.article}
            onPress={() => openLink(article.link)}
          >
            <Image
              source={{ uri: article.image_url || 'https://via.placeholder.com/120' }}
              style={index === 0 ? styles.featuredImage : styles.articleImage}
            />
            <Text style={index === 0 ? styles.featuredTitle : styles.articleTitle}>
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
    backgroundColor: '#f0f0f0',
    marginTop: 130,
    marginBottom: 80,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsScroll: {
    flex: 1,
  },
  featuredArticle: {
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  article: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  featuredTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default NewsScreen;
