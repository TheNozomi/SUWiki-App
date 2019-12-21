import React from 'react';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Button,
  ThemeProvider
} from 'react-native-elements';

class ChatScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat</Text>
      </View>
    );
  }
}

export default ChatScreen;