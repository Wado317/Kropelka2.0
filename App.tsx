import 'react-native-gesture-handler';

import React from 'react';
import AppConnected from './AppConnected';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};

export default App;
