import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {MovieCard} from './MovieCard';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

export const List = React.memo(function List({title, content, navigation}) {
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        data={content}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MovieCard item={item} navigation={navigation} />
        )}
        horizontal={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  list: {marginTop: 25},
  title: {fontSize: 20, fontWeight: 'bold', paddingBottom: 20},
});

List.propTypes = propTypes;
