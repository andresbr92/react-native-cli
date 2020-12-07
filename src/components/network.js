import { resolvePlugin } from "@babel/core";
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

import {request, PERMISSIONS} from 'react-native-permissions';

export const {LocalOnlyHotspot} = NativeModules



function network(props) {
  const [SSID, setSsid] = useState("");
  const [password, setPassword] = useState("");

  // request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {
  //   console.log("COARSE LOCATION: ",result)
  // })
  // request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
  //   console.log("FINE LOCATION: ", result)
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