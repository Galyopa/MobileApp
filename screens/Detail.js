import React, {useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Modal,
} from 'react-native';
import dateFormat from 'dateformat';
import StarRating from 'react-native-star-rating-widget';
import {getMovieDetails} from '../services/services';
import PlayButton from '../components/PlayButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

export const Detail = ({route}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovieDetails(movieId)
      .then(movieData => {
        setMovie(movieData);
        setLoaded(true);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {!loaded && <ActivityIndicator size={'large'} />}
      {loaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={
                movie.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' + movie.poster_path,
                    }
                  : placeholderImage
              }
            />

            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              {movie.genres && (
                <View style={styles.genresContainer}>
                  {movie.genres.map(genre => (
                    <Text key={genre.id} style={styles.genre}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                style={styles.starts}
                rating={movie.vote_average / 2}
                enableHalfStar={true}
                onChange={() => {}}
              />
              <Text style={styles.overview}>{movie.overview}</Text>
              <Text style={styles.release}>
                {`Release date: ${dateFormat(
                  movie.release_date,
                  'mmmm dS, yyyy',
                )}`}
              </Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            visible={modalVisible}
            supportedOrientations={['landscape', 'portrait']}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <SafeAreaView style={styles.modal}>
              <Video onClose={videoShown} />
            </SafeAreaView>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  genre: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  starts: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  closeButton: {
    marginTop: 200,
  },
  modal: {
    flex: 1,
  },
});
