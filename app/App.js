import React from 'react';
import 'react-native-gesture-handler';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import {
  Button,
  ThemeProvider
} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DiscussionsScreen from './screens/DiscussionsScreen';
import ChatScreen from './screens/ChatScreen';
import OptionsScreen from './screens/OptionsScreen';

import FandomAPI from './src/fandom';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.api = new FandomAPI();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }
  
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('accessToken'),
      userId = await AsyncStorage.getItem('localUserId');
    if (!token || !userId) this.props.navigation.navigate('Auth');

    this.api.whoami(token).then((result) => {
      console.log(result);
      if (result.userId === userId) {
        this.props.navigation.navigate('App');
      } else {
        Alert.alert('Sesión expirada', 
         'Tu sesión expiró. Vuelve a iniciar sesión para continuar.');
        this.props.navigation.navigate('Auth'); 
      }
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
       Alert.alert('Sesión expirada', 
        'Tu sesión expiró. Vuelve a iniciar sesión para continuar.');
       this.props.navigation.navigate('Auth');      
      } else {
       Alert.alert('Error de red', err.message);  
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const AuthNavigator = createStackNavigator({
  Login: LoginScreen
});

const AppNavigator = createBottomTabNavigator(
  {
    'Wiki': HomeScreen,
    'Discusiones': DiscussionsScreen,
    'Chat': ChatScreen,
    'Menú': OptionsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        switch (routeName) {
          case 'Wiki': {
            iconName = 'ios-paper';
            break;
          }
          case 'Discusiones': {
            iconName = 'ios-chatbubbles';
            break;
          }
          case 'Chat': {
            iconName = 'ios-text';
            break;
          }
          case 'Menú': {
            iconName = 'ios-menu';
            break;
          }
          default: {
            iconName = 'ios-apps';
            break;
          }
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);