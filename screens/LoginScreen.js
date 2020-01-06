import React from 'react';
import 'react-native-gesture-handler';

import {
  Alert,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Button,
  Input,
  ThemeProvider
} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import ThemeVariables from '../styles/ThemeVariables';
import styles from '../styles/LoginScreen';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};;
    this.state = {
      username: '',
      password: '',
      loginProcessing: false
    }
  }

  focusNextField(key) {
    this.inputs[key].focus();
  }

  static navigationOptions = {
    title: 'Steven Universe Wiki',
  };

  render() {
    return (
      <SafeAreaView>
        <ImageBackground source={require('../resources/backgrounds/Volleyball_BG_5.png')} style={styles.bgImage}>
          <View style={styles.overlay}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.subtitle}>Inicia sesión con tu cuenta de FANDOM</Text>
            <Input
              ref={input => {
                  this.inputs['username'] = input;
              }}
              placeholder='Nombre de usuario'
              leftIcon={{ type: 'ionicons', name: 'person', color: 'white' }}
              containerStyle={styles.inputContainer}
              inputStyle={{color: 'white'}}
              placeholderTextColor={'gray'}
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
            <Input
              ref={input => {
                  this.inputs['password'] = input;
              }}
              placeholder='Contraseña'
              leftIcon={{ type: 'ionicons', name: 'lock', color: 'white' }}
              containerStyle={styles.inputContainer}
              inputStyle={{color: 'white'}}
              placeholderTextColor={'gray'}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              onSubmitEditing={this._handleLogIn}
              blurOnSubmit={false}
              returnKeyType={'done'}
            />
            <Button 
              title="Iniciar sesión"
              buttonStyle={styles.primaryButton}
              loading={this.state.loginProcessing}
              onPress={this._handleLogIn}
            />
            <Button title="¿Olvidaste tu contraseña?" type="clear" onPress={this._handleForgotPassword} />
            <View style={styles.additionalContainer}>
              <Text style={styles.subtitle}>¿Aún no tienes una cuenta?</Text>
              <Button title="Registrarse" buttonStyle={styles.primaryButton} onPress={this._handleSignUp} />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  _handleLogIn = async (e) => {
    this.setState({
      loginProcessing: true
    })
    console.log(e);
    //Alert.alert('aaaaa')
    //await AsyncStorage.setItem('userToken', 'abc');
    //this.props.navigation.navigate('App');
  };

  _handleForgotPassword = async() => {
    try {
      const url = 'https://www.fandom.com/forgot-password';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          preferredBarTintColor: ThemeVariables.primaryColor,
          preferredControlTintColor: 'white',
          // Android Properties
          toolbarColor: ThemeVariables.primaryColor,
          secondaryToolbarColor: 'black'
        });
      }
      else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  _handleSignUp = async() => {
    try {
      const url = 'https://www.fandom.com/register';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          preferredBarTintColor: ThemeVariables.primaryColor,
          preferredControlTintColor: 'white',
          // Android Properties
          toolbarColor: ThemeVariables.primaryColor,
          secondaryToolbarColor: 'black'
        });
      }
      else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message);
    }
  }

}

export default LoginScreen;
