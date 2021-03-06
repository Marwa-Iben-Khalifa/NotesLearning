import React, { useContext, useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import Card from "../Components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext, NotesContext } from "../utils/context";
import UpdateNote from "../Components/UpdateModal";

export default function MyNotes({ navigation }: { navigation: any }) {
  const { allNotes, setAllNotes, setReloadNotes } = useContext(NotesContext);
  const [myNotes, setMyNotes] = useState(allNotes);
  const { authorName, setAuthorName } = useContext(LoginContext);
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({} as INote);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
   allNotes && setLoading(false) 
  },[])

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
    id: string,
    note: INote
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={{ justifyContent: "space-around" }}>
        {/* <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View> */}
        <Animated.View
          style={[
            {
              backgroundColor: "#EB3E1B",
              height: 50,
              width: 120,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            },
            { opacity },
          ]}
        >
          <TouchableOpacity onPress={() => deleteNote(id)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: "#F6BD60",
              height: 50,
              width: 120,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            },
            { opacity },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible((old) => !old);
              setCurrentNote(note);
            }}
          >
            <Text style={{ color: "white" }}>Update</Text>
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
    <>
      {modalVisible ? (
        <View>
          <UpdateNote
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            note={currentNote}
          ></UpdateNote>
        </View>
      ) : (
        <View style={{ paddingTop: 80 }}>
          <ScrollView>
            {myNotes.map((el) => (
              <Swipeable
                key={el._id}
                ref={(ref) => {
                  row.current[el._id] = ref;
                }}
                renderRightActions={(progress, dragAnimatedValue) =>
                  renderRightActions(progress, dragAnimatedValue, el._id, el)
                }
              >
                <Card key={el._id} note={el} children={undefined}></Card>
              </Swipeable>
            ))}
              <RefreshControl refreshing={loading} onRefresh={()=>{setReloadNotes(old =>!old)}} />
          </ScrollView>
        </View>
      )}
    </>
  );
}

function NotesService() {
  throw new Error("Function not implemented.");
}
