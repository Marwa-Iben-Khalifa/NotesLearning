import React, { useEffect, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {Animated ,StyleSheet, View, Text, ScrollView ,TouchableOpacity} from "react-native";
import DataService from "../Services/Api";
import { INote } from "../utils/types";
import Card from "../Components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyNotes({ navigation }: { navigation: any }) {
  const [myNotes, setMyNotes] = useState([] as INote[]);
  const [author, setAuthor] = useState("");
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View >
        {/* <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View> */}
        <Animated.View style={[{backgroundColor:"#EB3E1B"}, {opacity}]}>
          <TouchableOpacity>
            <Text style={{color:"white" }}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

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
          <Swipeable renderRightActions={renderRightActions}>
            <Card key={el._id} note={el}>
            </Card>
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
