import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Init from './components/Init';
// import Header from './components/Header'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Header></Header> */}
      <Init></Init>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27496d',
  },
});
