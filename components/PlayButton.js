import React, {memo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../themes/Colors';

const PlayButton = ({handlePress}) => {
  return (
    <Pressable onPress={() => handlePress()} style={styles.button}>
      <Icon name={'play-circle'} size={30} color={Colors.white} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
});
export default memo(PlayButton);
