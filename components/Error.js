import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Ops! Thomething went wrong',
  errorText2: 'Make sure you are online and restart App',
};

export const Error = memo(function Error({errorText1, errorText2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorText1}</Text>
      <Text style={styles.text}>{errorText2}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});
Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
