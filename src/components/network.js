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

export const {CalendarModule} = NativeModules



function network(props) {
  const [SSID, setSsid] = useState("");
  const [password, setPassword] = useState("");


  async function checkIt() {

  
    CalendarModule.createCalendarEvent('Me cago en tu puta madre', 'la madre que te pario payaso');

      
     
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