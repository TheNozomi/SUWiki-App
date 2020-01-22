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
  SearchBar,
  ThemeProvider,
  Tile
} from 'react-native-elements';

class HomeScreen extends React.Component {
  state = {
    search: ''
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SafeAreaView style={styles.activityContainer}>
        <SearchBar
          platform="ios"
          placeholder="Buscar"
          onChangeText={this.updateSearch}
          value={search}
        />
        <ScrollView styles={styles.mainContainer} contentContainerStyle={styles.mainContent}>
          <Text>Aquí se presentarían los artículos del wiki. (?)</Text>
          <Tile
            imageSrc={{uri: 'http://images6.fanpop.com/image/photos/42900000/Dahyun-twice-jyp-ent-42972863-700-875.jpg'}}
            title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
            featured
            caption="Some Caption Text"
          />
          <Tile
            imageSrc={{uri: 'http://images6.fanpop.com/image/photos/42900000/Dahyun-twice-jyp-ent-42972863-700-875.jpg'}}
            title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"

            caption="Some Caption Text"
          />
          <Tile
            imageSrc={{uri: 'http://images6.fanpop.com/image/photos/42900000/Dahyun-twice-jyp-ent-42972863-700-875.jpg'}}
            title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
            featured
            caption="Some Caption Text"
          />
          <Button
            title="Ir a Discusiones"
            type="clear"
            onPress={() => this.props.navigation.navigate('Discusiones')}
          />
        </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,

  },
  mainContainer: {
    flex: 1
  },
  mainContent: {
      alignItems: 'center',
      justifyContent: 'center'

  }
})

export default HomeScreen;