import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AccessPage from "./AccessPage";

export default function Home({ navigation }: { navigation: any }) {
  const [author, setAuthor] = useState("");
  const [isDionnected, setIsDisconnected] = useState(false);
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("author");
    setAuthor(jsonValue ?? " YOU");
  };

  useEffect(() => {
    getData();
    setAuthor(author);
  }, [isDionnected]);

  const disconnect = async () => {
    await AsyncStorage.removeItem("author");
    setIsDisconnected(true);
    return setAuthor("");
  };

  return (
    <>
      {isDionnected ? (
        <AccessPage setIsDisconnected={setIsDisconnected}></AccessPage>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Hello {author}</Text>
          <Text style={styles.secondaryText}>Need to share some notes ?</Text>
          <Text
            style={styles.secondaryText}
            onPress={() => {
              navigation.navigate("New");
            }}
          >
            Let's Start!
          </Text>
          <TouchableOpacity style={styles.button} onPress={disconnect}>
            <Text style={{ fontWeight: "bold" }}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  button: {
    padding: 20,
    marginTop: 100,
    borderRadius: 20,
    backgroundColor: "#D1ACA5",
  },
  secondaryText: {
    color: "#083346",
    fontWeight: "100",
    fontSize: 18,
    paddingTop: 30,
  },
});
