import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text,ScrollView } from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import Card from "../Components/Card"

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
      <ScrollView >
        {notes.map((el) => (
          <Card key={el._id} title={el.title} text={el.text}>
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
