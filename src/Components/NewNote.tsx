import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Switch, Text } from "react-native";
import { Formik } from "formik";
import Button from "./Button";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TagInput from "react-native-tags-input";

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
    // console.log(response.data);
  };
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState({ tag: "", tagsArray: [] });
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("author");
    setAuthor(jsonValue ?? "");
  };
  const [anonymeVal, setAnonymeVal] = useState(false);
  const toggleSwitch = () => setAnonymeVal((previousState) => !previousState);
  useEffect(() => {
    getData();
  }, []);
  const updateTagState = (state: any) => {
    setTags(state);
    // console.log(state);
  };

  return (
    <>
      <View>
        <Text style={styles.h1}>Ajouter votre note par ici :</Text>
        <Formik
          initialValues={{ title: "", tags: "", note: "", anonyme: anonymeVal }}
          onSubmit={(values, { resetForm }) => {
            const note: Partial<INote> = {
              author: author,
              title: values.title,
              anonym: values.anonyme,
              tags: tags.tagsArray,
              text: values.note,
            };

            // setValues({ title: "", tags: "", note: "", anonyme: anonymeVal });
            sendNote(note);
            resetForm();
            setTags({ tag: "", tagsArray: [] });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
            <View>
              <View style={styles.row}>
                <Text style={styles.title}>Titre</Text>
                <TextInput
                  onChangeText={handleChange("title")}
                  placeholder={"Title"}
                  value={values.title}
                  style={styles.input}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Tags</Text>
                <TagInput
                  style={styles.input}
                  updateState={updateTagState}
                  tags={tags}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Note</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  onChangeText={handleChange("note")}
                  placeholder={"Note"}
                  value={values.note}
                  style={styles.input}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Anonyme</Text>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={values.anonyme ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={(values.anonyme = anonymeVal)}
                />
              </View>

              <Button
                style={styles.button}
                children={"Submit"}
                onPressed={() => {
                  handleSubmit();
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    // marginLeft: 40,
  },
  h1: {
    fontSize: 25,
    marginLeft: 30,
    marginBottom: 50,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
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
    width: "22%",
    marginLeft: 130,
    marginTop:30
  },
});
