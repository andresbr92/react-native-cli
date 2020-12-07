
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  PermissionsAndroid,
  NativeModules

} from "react-native";

import {requestMultiple,request, PERMISSIONS} from 'react-native-permissions';

export const {LocalOnlyHotspot} = NativeModules



function network(props) {
  const [SSID, setSsid] = useState("");
  const [password, setPassword] = useState("");

  
  requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
    console.log('COARSE', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
    console.log('FINE', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
  });
  // request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION ).then(res => {
  //   console.log(res)
  // })

  async function checkIt() {
  
   
    await LocalOnlyHotspot.start(LocalOnlyHotspot.start(
      (data)=>{
        
        console.log(data)
      },(reason)=>{
        console.log(reason)
      }))

 




  }
 

  return (
    <>
      <TextInput
        onChangeText={(SSID) => setSsid(SSID)}
        placeholder="ssid"
        value={SSID}
      />
      <TextInput
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        value={password}
      />

      <Button title="Crear hotspott" onPress =  {() => checkIt()}  />
    </>
  );
}

export default network;