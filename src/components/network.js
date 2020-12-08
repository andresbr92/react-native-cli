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

import Svg, {Defs, Path, Circle,SvgXml} from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';

function network(props) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [svg, setSvgFromWifi] = useState()

  requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_NETWORK_STATE,
  ]).then((statuses) => {
    // console.log('COARSE', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
    // console.log('FINE', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
    // console.log('NETWORK', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
  });

  

  const setSvg = () => {

  const qrcode = require('wifi-qr-code-generator');

  const pr = qrcode.generateWifiQRCode({
    ssid: ssid,
    password: password,
    encryption: 'WPA',
    hiddenSSID: false,
    outputFormat: {type: 'terminal'},

  });
  pr.then(async (data) => {
    console.log(data)
   await setSvgFromWifi(data)
    console.log(svg,'es este el undefine')
  });
  }
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h41v41H0z"/><path stroke="#000000" d="M4 4.5h7m1 0h2m1 0h1m4 0h1m2 0h2m1 0h1m1 0h1m1 0h7M4 5.5h1m5 0h1m1 0h1m7 0h1m3 0h1m3 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m3 0h1m3 0h2m5 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m3 0h2m6 0h2m1 0h2m3 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h2m2 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m2 0h1m1 0h1m5 0h1m1 0h1m2 0h3m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M16 11.5h2m4 0h6M4 12.5h1m2 0h9m1 0h1m1 0h1m2 0h3m1 0h1m2 0h1m2 0h1m1 0h3M4 13.5h3m1 0h1m4 0h2m1 0h1m2 0h2m3 0h1m2 0h3m2 0h4M4 14.5h4m2 0h2m2 0h3m1 0h1m1 0h3m1 0h1m3 0h2m2 0h1m1 0h1m1 0h1M6 15.5h4m2 0h5m1 0h1m1 0h3m1 0h4m1 0h1m1 0h2m1 0h1m1 0h1M4 16.5h1m2 0h1m1 0h4m4 0h2m1 0h3m1 0h4m1 0h1m2 0h2m1 0h1M7 17.5h1m5 0h1m1 0h1m4 0h3m1 0h1m1 0h4m2 0h1m1 0h2M4 18.5h1m2 0h2m1 0h1m3 0h1m5 0h4m1 0h1m1 0h2m3 0h1m1 0h2M5 19.5h1m1 0h2m2 0h2m1 0h2m2 0h2m1 0h2m1 0h1m1 0h1m1 0h2m2 0h1m2 0h1M4 20.5h1m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m4 0h4m3 0h1m2 0h1m3 0h1M4 21.5h5m2 0h1m2 0h2m1 0h2m1 0h1m4 0h1m2 0h3m1 0h2m1 0h1M4 22.5h4m2 0h3m7 0h1m4 0h1m4 0h2m3 0h2M5 23.5h2m2 0h1m3 0h3m1 0h2m2 0h2m2 0h3m1 0h2m2 0h1m1 0h2M4 24.5h2m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m9 0h1m2 0h1m3 0h1m1 0h2M4 25.5h2m1 0h1m3 0h1m3 0h2m3 0h5m1 0h5m4 0h2M4 26.5h1m1 0h2m1 0h2m2 0h2m4 0h3m1 0h1m1 0h1m1 0h1m2 0h3m2 0h2M4 27.5h1m1 0h1m1 0h1m2 0h5m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1m2 0h1M4 28.5h2m2 0h3m1 0h2m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h7m3 0h1M12 29.5h2m1 0h1m1 0h1m4 0h1m1 0h5m3 0h3m1 0h1M4 30.5h7m1 0h2m1 0h1m3 0h1m2 0h1m3 0h3m1 0h1m1 0h1m2 0h1M4 31.5h1m5 0h1m1 0h1m1 0h1m1 0h1m1 0h1m4 0h2m1 0h1m1 0h1m3 0h1m1 0h1M4 32.5h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h1m2 0h2m1 0h2m1 0h6M4 33.5h1m1 0h3m1 0h1m1 0h1m1 0h2m7 0h1m1 0h1m2 0h1m2 0h1m1 0h2M4 34.5h1m1 0h3m1 0h1m2 0h1m2 0h2m2 0h4m1 0h3m3 0h2m2 0h2M4 35.5h1m5 0h1m3 0h1m1 0h2m1 0h2m1 0h2m2 0h2m4 0h1m1 0h2M4 36.5h7m1 0h1m1 0h1m7 0h1m1 0h1m1 0h1m1 0h1m4 0h3"/></svg>`


  return (
    <>
     
      <Button
        title="Crear hotspott"
        onPress={() =>
          LocalOnlyHotspot.start(
            (data) => {
              const {secret, ssid} = data
              setSsid(ssid)
              setPassword(secret)
              setSvg()
            },
            (reason) => {
              console.log(reason);
              //setPassword(reason)
            },
          )
        }
      />
     
      
       <View>
         <SvgXml
         
         xml={svg} 
         height={200}
         width={200}

         />
         
        {/* <Svg
        height={200}
        width={200}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 841.89 595.28"
          viewBox="0 0 41 41"
          shapeRendering="crispEdges"
          {...props}>
          <Path fill="#fff" d="M0 0h41v41H0z" />
          <Path
            stroke="#000"
            d="M4 4.5h7m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m3 0h1m1 0h7m-33 1h1m5 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h5m2 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m3 0h1m2 0h1m1 0h2m3 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m2 0h3m3 0h1m3 0h1m3 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m2 0h1m4 0h1m3 0h1m1 0h2m1 0h2m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-24 1h3m1 0h2m2 0h6m1 0h1m-25 1h1m2 0h7m2 0h2m1 0h1m1 0h4m1 0h1m2 0h1m2 0h1m1 0h3m-33 1h1m2 0h1m1 0h1m1 0h2m1 0h1m5 0h1m2 0h2m2 0h3m2 0h4m-32 1h1m1 0h3m1 0h2m3 0h2m1 0h1m1 0h3m2 0h1m1 0h3m1 0h2m1 0h1m-30 1h2m4 0h2m1 0h3m1 0h1m1 0h2m2 0h1m2 0h3m2 0h1m1 0h1m-28 1h1m1 0h3m2 0h5m1 0h3m1 0h7m1 0h2m1 0h2m-33 1h1m1 0h3m2 0h2m1 0h1m1 0h2m2 0h2m1 0h1m1 0h2m1 0h2m3 0h3m-31 1h2m1 0h5m2 0h1m1 0h1m2 0h1m1 0h1m2 0h3m1 0h1m1 0h1m3 0h1m-31 1h3m5 0h2m1 0h1m2 0h1m1 0h1m1 0h1m10 0h2m-30 1h1m1 0h1m1 0h1m6 0h2m1 0h1m1 0h2m-20 1h1m1 0h2m1 0h1m2 0h2m1 0h1m1 0h4m4 0h1m1 0h4m1 0h2m1 0h2m-33 1h4m1 0h2m2 0h1m1 0h1m1 0h1m5 0h2m4 0h1m1 0h1m3 0h2m-32 1h1m1 0h3m2 0h3m2 0h2m2 0h5m1 0h1m4 0h2m-28 1h1m1 0h1m1 0h1m6 0h2m5 0h2m3 0h3m1 0h1m1 0h1m-32 1h1m6 0h4m3 0h1m1 0h3m1 0h1m1 0h1m1 0h1m6 0h2m-33 1h1m1 0h5m2 0h3m1 0h4m1 0h1m3 0h1m1 0h3m3 0h3m-33 1h1m2 0h3m2 0h6m2 0h3m3 0h3m1 0h2m1 0h1m-30 1h2m4 0h1m2 0h1m3 0h3m2 0h3m1 0h7m3 0h1m-25 1h1m1 0h6m4 0h1m1 0h3m3 0h3m-31 1h7m1 0h1m1 0h1m2 0h1m2 0h1m1 0h1m1 0h5m1 0h1m1 0h1m2 0h1m-32 1h1m5 0h1m1 0h3m3 0h1m1 0h1m7 0h1m3 0h1m1 0h3m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h3m1 0h2m1 0h5m1 0h6m2 0h1m-32 1h1m1 0h3m1 0h1m1 0h4m2 0h1m5 0h1m2 0h1m5 0h2m-31 1h1m1 0h3m1 0h1m3 0h2m1 0h1m2 0h3m1 0h1m1 0h1m1 0h1m3 0h2m1 0h2m-33 1h1m5 0h1m4 0h1m1 0h4m1 0h1m6 0h1m2 0h1m2 0h1m-32 1h7m1 0h1m2 0h2m4 0h2m1 0h3m1 0h2m3 0h3"
          />
        </Svg> */}
      </View> 
      <Button title="obtener info" onPress={()=>LocalOnlyHotspot.getConfig(
          (data)=>{
            console.log(data)
           // setSsid(data)
          })}/>
          <Button title="STOP" onPress={()=>LocalOnlyHotspot.stop(
          (data)=>{
            console.log(data)
           // setSsid(data)
          })}/>
    </>
  );
}

export default network;
