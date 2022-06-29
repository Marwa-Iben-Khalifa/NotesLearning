import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";

export default function Notes({ navigation }: { navigation: any }) {
  const [notes, setNotes] = useState([] as INote[]);
  const handleNotes = async () => {
    const response = await DataService.getAll();
    setNotes(response.data);
    return console.log(response.data);
  };
  useEffect(() => {
    handleNotes();
  }, []);
  return (
    <View style={styles.container}>
      {notes.map((el) => (
        <Text>
          id : {el._id} title : {el.title}
        </Text>
      ))}
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
