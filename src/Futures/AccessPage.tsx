import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useColorScheme,
} from "react-native";
import { Formik } from "formik";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../utils/context";

export default function AccessPage({
  setIsDisconnected,
}: {
  setIsDisconnected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { authorName, setAuthorName } = useContext(LoginContext);
  return (
    <View style={{ marginTop: 80 }}>
      <Text style={styles.h1}>Bienvenue dans MyNote</Text>
      <Text style={styles.title}>Veuillez saisir votre pseudo :</Text>
      <Formik
        initialValues={{ author: "" }}
        onSubmit={async (values) => {
          await AsyncStorage.setItem("author", values.author);
          setIsDisconnected(false);
          setAuthorName(values.author);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ padding: 10 }}> Name :</Text>
              <TextInput
                onChangeText={handleChange("author")}
                placeholder={"Title"}
                value={values.author}
                style={{ padding: 10 }}
              />
            </View>
            <Button
              style={styles.button}
              children={"Valider"}
              onPressed={() => {
                handleSubmit();
              }}
            />
          </View>
        )}
      </Formik>
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
  input: {
    borderColor: "gray",
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    // marginLeft: 40,
  },
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 50,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 30,
    marginBottom: 50,
  },
  switch: {
    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    marginLeft: 30,
    // justifyContent: "space-evenly",
  },
  button: {
    width: "23%",
    marginLeft: 130,
    marginTop: 30,
  },
});
