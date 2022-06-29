import React from "react";
import { StyleSheet,View, Text } from "react-native";

export default function New({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text>Voici la page new</Text>
      {/* <Text
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Aller sur la page Home
      </Text> */}
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