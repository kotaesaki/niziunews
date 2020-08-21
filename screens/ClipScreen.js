import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import Listitem from '../component/Listitem';

export default ClipScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const { clips } = user;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clips}
        renderItem={({ item }) => (
          <Listitem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
