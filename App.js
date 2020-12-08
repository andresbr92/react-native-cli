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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import SvgComponent from './src/components/fabs'
import Network from './src/components/network'

function App() {
  



  return (
    <>
      <View style={styles.container}>
        <View style={styles.container2}>
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
  container2: { 
    
    width: wp('70%'),   // 80% of width device screen
    height: hp('40%'), // 70% of height device screen
    }
  
});


export default App;
