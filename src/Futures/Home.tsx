import React from "react";
import { View, Text } from "react-native";

export default function Home({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>Voici la home Page</Text>
      <Text
        onPress={() => {
          navigation.navigate("Detail");
        }}
      >
        Aller sur la page Detail
      </Text>
    </View>
  );
}
