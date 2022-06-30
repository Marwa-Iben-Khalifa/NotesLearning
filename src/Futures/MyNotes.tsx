import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import Card from "../Components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyNotes({ navigation }: { navigation: any }) {
  const [myNotes, setMyNotes] = useState([] as INote[]);
  const [author, setAuthor] = useState("");

  const handleAuthor = async () => {
    const jsonValue = await AsyncStorage.getItem("author");
    setAuthor(jsonValue ?? "");
  };
  const handleNotes = async () => {
    const response = await DataService.getAll();
    const result = response.data.filter((word) => {
      return word.author === author;
    });

    setMyNotes(result);
  };


  useEffect(() => {
    handleAuthor();
  }, []);

  useEffect(() => {
    handleNotes();
  }, [author]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {myNotes.map((el) => (
          <Card key={el._id} note={el}>
            {"\n"}
          </Card>
        ))}
      </ScrollView>
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
function NotesService() {
  throw new Error("Function not implemented.");
}
