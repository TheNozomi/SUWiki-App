/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import {
  Button,
  ThemeProvider
} from 'react-native-elements';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DiscussionsScreen from './screens/DiscussionsScreen';
import ChatScreen from './screens/ChatScreen';
import OptionsScreen from './screens/OptionsScreen';


class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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