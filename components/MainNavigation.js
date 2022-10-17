import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {Detail} from '../screens/Detail';
import Navbar from './Navbar';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          header: ({navigation}) => (
            <Navbar navigation={navigation} main={true} />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <Navbar navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <Navbar navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default memo(MainNavigation);
