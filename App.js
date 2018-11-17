/*
  $ npm install react-native-textinput-effects --save
  $ npm install axios
  $ npm install --save react-navigation
  $ npm install --save react-native-elements
  $ npm install react-native-animatable --save
  $ npm install react-native-vector-icons --save
*/

import { createStackNavigator } from 'react-navigation';

import Login from './screens/Login';
import Regras from './screens/Regras';
import Enigma1 from './screens/Enigma1';

export default createStackNavigator(
  {
    'Main' : {
        screen : Login
    },
    'Regras' : {
      screen : Regras
    },
    'Enigma1' : {
      screen : Enigma1
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);
