import React, {memo} from 'react';
import {SafeAreaView, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

import Logo from '../assets/images/logo.svg';

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
          <Logo width={50} height={50} />
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
  mainNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default memo(Navbar);
