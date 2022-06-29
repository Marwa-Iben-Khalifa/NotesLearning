import React, { useEffect, useState } from "react";
import { StyleSheet,View, Text } from "react-native";
import NewNote from "../Components/NewNote"
export default function New({ navigation }: { navigation: any }) {
  const [values, setValues] = useState({})
  useEffect(() => {
    console.log(values)
  },[values])
  return (
    <View style={styles.container}>
      <Text>Voici la page new</Text>
      <NewNote setValues={setValues}></NewNote>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});