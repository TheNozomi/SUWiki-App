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

class DiscussionsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Discussions</Text>
      </View>
    );
  }
}

export default DiscussionsScreen;