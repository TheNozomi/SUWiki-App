import { StyleSheet } from 'react-native';
import ThemeVariables from './ThemeVariables';

const styles = {
  bgImage: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 8,
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 8,
    marginBottom: 8
  },
  additionalContainer: {
    marginTop: 20
  }
};

module.exports = StyleSheet.create(styles);