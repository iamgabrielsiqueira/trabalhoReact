/*
  $ npm install react-native-textinput-effects --save
  $ npm install axios
  $ npm install --save react-navigation
  $ npm install --save react-native-elements
  $ npm install react-native-animatable --save
  $ npm install react-native-vector-icons --save
  $ npm i --save lodash
*/

import { createStackNavigator } from 'react-navigation';

import Login from './screens/Login';
import Regras from './screens/Regras';
import Enigmas from './screens/Enigmas';
import Ranking from './screens/Ranking';
import Usuarios from './screens/Usuarios';

import Enigma1 from './screens/Enigma1';
import Enigma2 from './screens/Enigma2';
import Enigma3 from './screens/Enigma3';
import Enigma4 from './screens/Enigma4';

export default createStackNavigator(
  {
    'Main' : {
      screen : Login
    },
    'Regras' : {
      screen : Regras
    },
    'Enigmas' : {
      screen : Enigmas
    },
    'Enigma1' : {
      screen : Enigma1
    },
    'Enigma2' : {
      screen : Enigma2
    },
    'Enigma3' : {
      screen : Enigma3
    },
    'Enigma4' : {
      screen : Enigma4
    },
    'Ranking' : {
      screen : Ranking
    },
    'Usuarios' : {
      screen : Usuarios
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);
