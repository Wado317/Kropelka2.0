import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from './src/const/routes';

import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import ChangeLanguageScreen from './src/screens/ChangeLanguageScreen/ChangeLanguageScreen';
// import useLanguage from './src/language/hooks/useLanguage';
// import './src/language';

const AppStack = createStackNavigator();

const AppConnected = () => {
  // const {loadAppLanguage} = useLanguage();

  // useEffect(() => {
  //   loadAppLanguage();
  // }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          component={SplashScreen}
          name={Routes.SplashScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <AppStack.Screen
          component={WelcomeScreen}
          name={Routes.WelcomeScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <AppStack.Screen
          component={ChangeLanguageScreen}
          name={Routes.ChangeLanguageScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
export default AppConnected;
