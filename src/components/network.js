import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

export const {LocalOnlyHotspot} = NativeModules;

import Svg, { SvgXml} from 'react-native-svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function network(props) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [svg, setSvgFromWifi] = useState();
  const [visible, setVisible] = useState(false)
  const [showIntems, setShowItems] = useState(false)

  requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_NETWORK_STATE,
  ]).then((statuses) => {
    // console.log('COARSE', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
    // console.log('FINE', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
    // console.log('NETWORK', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
  });

  

  
  
useEffect(() => {
    const qrcode = require('wifi-qr-code-generator');

    const pr = qrcode.generateWifiQRCode({
      ssid: ssid,
      password: password,
      encryption: 'WPA',
      hiddenSSID: false,
      outputFormat: {type: 'terminal'},
    });
    pr.then(async (data) => {
      
      await setSvgFromWifi(data);

    });
  

},[ssid,password, visible, showIntems])
  
  

  return (
    <>
      <View style={styles.waitText}>
        {visible ? (  <SvgXml  xml={svg} height={200} width={200} />) : <Text  >Esperando hotspot</Text>}


        {/* {showIntems && visible ?  (<Text>WIFI: {ssid} PASSWORD: {password} </Text>) : null} */}


        
      </View>
      <View style={styles.buttons}>
        <Button
          title="Hotspot"
          onPress={() =>
            LocalOnlyHotspot.start(
              (data) => {
                console.log(data)
                const {secret, ssid} = data;
                setSsid(ssid);
                setPassword(secret);
                setVisible(true)
              },
              (reason) => {
                console.log(reason);
              },
            )
          }
        />
        <Button
          title="Mostrar info"
          onPress={() =>
            LocalOnlyHotspot.getConfig((data) => {
              console.log(data);
              setShowItems(true)
            })
          }
        />
        <Button
          title="STOP"
          onPress={() =>LocalOnlyHotspot.stop((data) => {
            setVisible(false)
          })
        }
            
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row",
    
    width: wp('90%'),   // 80% of width device screen
    height: hp('20%'), // 70% of height device screen
    
  },
  waitText: {
    justifyContent:"center",
    alignItems:"center",
    
    width: wp('90%'),   // 80% of width device screen
    height: hp('30%'), // 70% of height device screen

  }
  
});

export default network;
