import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTV} from '../services/services';
import {MovieCard} from '../components/MovieCard';
import {Error} from '../components/Error';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = () => {
    Promise.all([searchMovieTV(query), searchMovieTV(query, 'tv')])
      .then(([movies, tv]) => setSearchResults([...movies, ...tv]))
      .catch(setError);
  };

  return (
    <React.Fragment>
      <SafeAreaView style={styles.box}>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder={'Search Movie'}
            />
          </View>
          <TouchableOpacity onPress={onSubmit}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={2}
              data={searchResults}
              renderItem={({item}) => (
                <MovieCard navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {searchResults && searchResults.length === 0 && (
            <View>
              <Text>No results matching your criteria</Text>
              <Text>Try different keywords</Text>
            </View>
          )}

          {!searchResults && (
            <View>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  input: {
    height: 50,
    margin: 12,
    borderRadius: 15,
    borderWidth: 0.5,
  },
  container: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  searchItems: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Search;
