import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, useColorScheme } from "react-native";
import { Formik } from "formik";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../utils/context";

export default function AccessPage(
  {
    setIsDisconnected,
  }: {
    setIsDisconnected: React.Dispatch<React.SetStateAction<boolean>>,
  
  }
) {
  const {authorName, setAuthorName } = useContext(LoginContext);
  return (
    <View style={styles.container}>
      <Text>Voici la home Page</Text>
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
              children={"Submit"}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
