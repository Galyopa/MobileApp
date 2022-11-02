import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './components/MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <MainNavigation />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
