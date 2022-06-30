import React, { useState } from "react";
import { View, TextInput, Switch, Text } from "react-native";
import { Formik } from "formik";
import Button from "./Button";
import DataService from "../Services/Api";
import { INote } from "../utils/types";

interface MyFormValues {
  firstName: string;
}
export default function NewNote({
  setValues,
}: {
  setValues: React.Dispatch<React.SetStateAction<{}>>;
}) {
  const sendNote = async (values: any) => {
    const response = await DataService.create(values);
    return console.log(response.data);
  };
  const [anonymeVal, setAnonymeVal] = useState(false);
  const toggleSwitch = () => setAnonymeVal((previousState) => !previousState);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
      }}
    >
      <Formik
        initialValues={{ title: "", tags: "", note: "", anonyme: anonymeVal }}
        onSubmit={(values) => {
          const note: INote = {
            title: values.title,
            anonym: values.anonyme,
            tags: values.tags.split("#"),
            text: values.note,
          };
          // setValues({ title: "", tags: "", note: "", anonyme: anonymeVal });
          sendNote(note);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("title")}
              placeholder={"Title"}
              value={values.title}
              style={{ padding: 10 }}
            />
            <TextInput
              onChangeText={handleChange("tags")}
              placeholder={"Tags"}
              value={values.tags}
              style={{ padding: 10 }}
            />
            <TextInput
              multiline
              numberOfLines={4}
              onChangeText={handleChange("note")}
              placeholder={"Note"}
              value={values.note}
              style={{ padding: 10 }}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={values.anonyme ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={(values.anonyme = anonymeVal)}
            />

            <Button
              children={"Submit"}
              onPressed={() => {
                handleSubmit();
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
