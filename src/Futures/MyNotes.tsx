import React, { useContext, useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import Card from "../Components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext, NotesContext } from "../utils/context";

export default function MyNotes({ navigation }: { navigation: any }) {
  const { allNotes, setAllNotes, setReloadNotes } = useContext(NotesContext);
  const [myNotes, setMyNotes] = useState(allNotes);
  const { authorName, setAuthorName } = useContext(LoginContext);
  const [id, setId] = useState("");

  let row = useRef<any>({});

  const closeSwipeable = (id: string) => {
    row.current[id].close();
  };

  const deleteNote = async (id: string) => {
    console.log("im deleting");
    await DataService.delete(id);
    closeSwipeable(id);
    setReloadNotes((old) => !old);
  };

  useEffect(() => {
    console.log("taille des notes", allNotes.length);
    handleNotes();
  }, [allNotes]);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
    id: string
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View>
        {/* <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View> */}
        <Animated.View style={[{ backgroundColor: "#EB3E1B" }, { opacity }]}>
          <TouchableOpacity onPress={() => deleteNote(id)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const handleNotes = () => {
    const result = allNotes.filter((word) => {
      return word.author === authorName;
    });

    setMyNotes(result);
  };

  useEffect(() => {
    handleNotes();
  }, [authorName]);

  // console.log(myNotes[0]);

  return (
    <View style={{ ...styles.container, paddingTop: 80 }}>
      <ScrollView>
        {myNotes.map((el) => (
          <Swipeable
            key={el._id}
            ref={(ref) => {
              row.current[el._id] = ref;
            }}
            renderRightActions={(progress, dragAnimatedValue) =>
              renderRightActions(progress, dragAnimatedValue, el._id)
            }
          >
            <Card key={el._id} note={el} children={undefined}></Card>
          </Swipeable>
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
