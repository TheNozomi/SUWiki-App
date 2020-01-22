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
import FandomAPI from '../src/fandom';

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
    this.api = new FandomAPI();

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
              autoCompleteType='off'
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
              autoCompleteType='off'
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
              disabled={this.state.loginProcessing}
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
    let loginData = {
      username: this.state.username.trim(),
      password: this.state.password.trim()
    }
    if (loginData.username && loginData.password) {
      this.setState({
        loginProcessing: true
      });
      this.api.getToken(this.state.username, this.state.password).then(async (result) => {
        console.log(result);
        await AsyncStorage.setItem('localUsername', loginData.username);
        await AsyncStorage.setItem('localUserId', result.user_id);
        await AsyncStorage.setItem('accessToken', result.access_token);
        this.props.navigation.navigate('App');
      }).catch((err) => {
        this.setState({
          loginProcessing: false
        });
        switch(err.error) {
          case 'unauthorized': {
            Alert.alert('Error al iniciar sesión', 
              'Datos rechazados, verifica tu nombre de usuario y contraseña.');
            break;
          }
          case 'rate_limited': {
            Alert.alert('Error al iniciar sesión',
              'Has intentado iniciar sesión demasiadas veces en un corto tiempo, por favor espera para volver a intentar.');
            break;
          }
          case 'network_error': {
            Alert.alert('Error al iniciar sesión',
              `Detalles: ${err.details}`);
            break;
          }
          default: {
            // shrug
            Alert.alert('Error no especificado', err.message);
            break;
          }
        }
      });
    } else {
      Alert.alert('Iniciar sesión',
        'Introduce un nombre de usuario y contraseña.');
    }
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
