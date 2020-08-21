import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import Listitem from '../component/Listitem';
import Loading from '../component/Loading';
import constants from 'expo-constants';
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { useState, useEffect } from 'react';

const URL = `http://newsapi.org/v2/everything?q=niziu&from=2020-06-25&sortBy=publishedAt&pageSize=20&apiKey=${constants.manifest.extra.newsApiKey}`;

const limiter = new Bottleneck({
  minTime: 200,
});

export default HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchArticles();
  }, []);
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await limiter.schedule(() => axios.get(URL));
      setArticles(response.data.articles);
      console.log(response);
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.config);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Listitem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  subtext: {
    fontSize: 12,
    color: 'grey',
  },
});
