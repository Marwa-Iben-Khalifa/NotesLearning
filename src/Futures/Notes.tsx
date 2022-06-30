import React, { useEffect, useState } from "react";
import { format } from "date-fns";
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
          <Card key={el._id} note={{...el, creation_date:format(new Date(el.creation_date), "MMMM do, yyyy H:mma")}}>
            {"\n"}
            {/* date={format(new Date(el.creation_date), "MMMM do, yyyy H:mma")} */}
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
