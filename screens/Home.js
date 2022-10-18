import React, {useEffect, useState} from 'react';
import Carousel from 'pinar';

import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  getDocumentaryMovies,
  getFamilyMovies,
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
} from '../services/services';
import {List} from '../components/List';
import {Error} from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const getData = () => {
    return Promise.all([
      getDocumentaryMovies(),
      getFamilyMovies(),
      getPopularMovies(),
      getPopularTV(),
      getUpcomingMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          documentaryMoviesData,
          familyMoviesData,
          popularMoviesData,
          popularTVData,
          upcomingMoviesData,
        ]) => {
          const moviesImagesArray = upcomingMoviesData.map(
            movie => 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );

          setMoviesImages(moviesImagesArray);
          setFamilyMovies(familyMoviesData);
          setPopularMovies(popularMoviesData);
          setPopularTV(popularTVData);
          setDocumentaryMovies(documentaryMoviesData);
          setLoaded(true);
        },
      )
      .catch(setError);
  }, []);

  return (
    <React.Fragment>
      {!loaded && !error && <ActivityIndicator size={'large'} />}

      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <Carousel
              loop={true}
              showsControls={false}
              showsDots={false}
              height={dimensions.height / 1.5}
              autoplay={true}>
              {moviesImages.map(image => (
                <Image
                  resizeMode="cover"
                  key={image}
                  source={{uri: image}}
                  style={styles.image}
                />
              ))}
            </Carousel>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Popular Movies'}
                content={popularMovies}
              />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Family Movies'}
                content={familyMovies}
              />
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Documentary Movies'}
                content={documentaryMovies}
              />
            </View>
          )}

          {popularTV && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Popular TV Shows'}
                content={popularTV}
              />
            </View>
          )}
        </ScrollView>
      )}

      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  carousel: {
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
  },
});

export default Home;
