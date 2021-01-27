import React, {useState, useEffect, Component} from 'react';
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
import StaticServer from 'react-native-static-server';
import Svg, { SvgXml} from 'react-native-svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RNFS from 'react-native-fs';



function network(props) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [svg, setSvgFromWifi] = useState();
  const [visible, setVisible] = useState(false)
  const [showIntems, setShowItems] = useState(false)
  const [origin, setOrigin] = useState('')
  const [server, setServer] = useState()
  const [url, setUrl] = useState()



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
  // moveAndroidFiles();




  
  
  //settings qr wifi
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

const startServer = async () => {
  moveAndroidFiles();
  let path = getPath();
  console.log(path, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
  const newServer = new StaticServer (13000, path)
  const origin = await newServer.start().then(url => {
    setUrl({url})
    console.log(url)
  })
  // newServer.origin().then(elm => console.log(elm,"origin"))
  //console.log(origin)
  setOrigin(origin).then(elm => console.log(elm))
  setServer(newServer)
  
  
}
function getPath() {
  return Platform.OS === "android"
    ? RNFS.DocumentDirectoryPath + "/www"
    : RNFS.MainBundlePath + "/www";
}
async function moveAndroidFiles() {
  if (Platform.OS === "android") {
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/www");
    const files = ["www/index.html", "www/index.css", "www/index.js"];
    await files.forEach(async file => {
      await RNFS.copyFileAssets(file, RNFS.DocumentDirectoryPath + "/" + file);
    });
  }
}
  
  

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
            {LocalOnlyHotspot.start(
              (data) => {
                
                const {secret, ssid} = data;
                setSsid(ssid);
                setPassword(secret);
                setVisible(true)
              },
              (reason) => {
                console.log(reason);
              },

            )

            startServer()
          
           
          }
            
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
