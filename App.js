/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
 
} from 'react-native';


import SvgComponent from './src/components/fabs'
import Network from './src/components/network'

function App() {
  



  return (
    <>
      <View style={styles.container}>
        <View>
          <SvgComponent />
        </View>

        <Network />
        

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(236, 182, 84)",
    alignItems: "center",
  },
  
});

export default App;
