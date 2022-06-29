import React from "react";
import { View ,Text} from "react-native";

export default function Home({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>Voici la Detail Page</Text>
      <Text
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Aller sur la page Home
      </Text>
    </View>
  );
}
