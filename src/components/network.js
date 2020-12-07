
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

  
  requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_NETWORK_STATE]).then((statuses) => {
    console.log('COARSE', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
    console.log('FINE', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
    console.log('NETWORK', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
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

 //Bus 001 Device 008: ID 04e8:6860 Samsung Electronics Co., Ltd Galaxy series, misc. (MTP mode)




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

      <Button title="Crear hotspott" onPress={()=>LocalOnlyHotspot.start(
          (data)=>{
            console.log(data)
           // setSsid(data)
          },(reason)=>{
            console.log(reason)
            //setPassword(reason)
          })}  />
           {/* <Button title="obtener info" onPress={()=>LocalOnlyHotspot.getConfig(
          (data)=>{
            console.log(data)
           // setSsid(data)
          })}/>
          <Button title="STOP" onPress={()=>LocalOnlyHotspot.stop(
          (data)=>{
            console.log(data)
           // setSsid(data)
          })}/> */}

    </>
  );
}

export default network;