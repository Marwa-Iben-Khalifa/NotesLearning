import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { StyleSheet, View, RefreshControl, ScrollView } from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import Card from "../Components/Card";
import { NotesContext } from "../utils/context";

export default function Notes({ navigation }: { navigation: any }) {
  // const [notes, setNotes] = useState([] as INote[]);
  const { allNotes,setReloadNotes } = useContext(NotesContext);
  
  const [loading,setLoading] = useState(true);
  useEffect(() => {
   allNotes && setLoading(false) 
  },[])

  return (
    <View style={styles.container}>
      <ScrollView>
        {allNotes.map((el) => (
          <Card
            key={el._id}
            note={{
              ...el,
              creation_date: format(
                new Date(el.creation_date),
                "MMMM do, yyyy H:mma"
              ),
            }}
          >
            {"\n"}
          </Card>
        ))}
        <RefreshControl refreshing={loading} onRefresh={()=>{setReloadNotes(old =>!old)}} />
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
