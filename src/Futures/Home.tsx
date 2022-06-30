import React from "react";
import {StyleSheet, View, Text} from "react-native";

export default function Home({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text>Voici la home Page</Text>
            {/* <Text
        onPress={() => {
          navigation.navigate("Detail");
        }}
      >
        Aller sur la page Detail
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