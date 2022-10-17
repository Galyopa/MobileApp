import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.object,
};

const placeholderImage = require('../assets/images/placeholder.png');

export const MovieCard = React.memo(function MovieCard({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', {movieId: item.id})}>
      <Image
        resizeMode="cover"
        source={
          item.poster_path
            ? {
                uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
              }
            : placeholderImage
        }
        style={styles.cover}
      />
      {!item.poster_path && <Text style={styles.movieTitle}>{item.title}</Text>}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  cover: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieTitle: {
    top: 10,
    position: 'absolute',
    width: 100,
    textAlign: 'center',
  },
});

MovieCard.propTypes = propTypes;
