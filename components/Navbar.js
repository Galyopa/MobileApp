import React, {memo} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

const Navbar = ({navigation, main}) => {
  return (
    <SafeAreaView>
      {main ? (
        <View style={styles.mainNav}>
          <Image
            resizeMode={'contain'}
            source={require('../assets/images/movies.png')}
            style={styles.logo}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name={'search-outline'} size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'chevron-back'} size={40} color={Colors.lightGrey} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
  },
  mainNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default memo(Navbar);
