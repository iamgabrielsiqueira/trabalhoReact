/*
  $ npm install react-native-textinput-effects --save
  $ npm install axios
  $ npm install --save react-navigation
  $ npm install --save react-native-elements
  $ npm install react-native-animatable --save
*/

import { createStackNavigator } from 'react-navigation';

import Login from './screens/Login';
import Regras from './screens/Regras';

export default createStackNavigator(
  {
    'Main' : {
        screen : Login
    },
    'Regras' : {
      screen : Regras
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);
