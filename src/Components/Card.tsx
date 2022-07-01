import React from "react";
import { View, Text, Image } from "react-native";
import { INote } from "../utils/types";

export default function Card({
  children,
  note,
}: {
  note: INote;
  children: React.ReactNode;
}) {
  const urlPhoto = note.image
    ? note.image
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
  const colors = ["red", "green", "blue", "orange", "yellow"];
  return (
    <View
      style={{
        backgroundColor: "#48B5D6",
        margin: 15,
        borderRadius: 25,
        padding: 10,
        width: "90%",
      }}
    >
      <Image
        style={{ height: 50, width: 50, position: "relative", margin: 10 }}
        source={require("../../assets/No_image.png")}
      />
      <Text style={{ margin: 10 }}>{note.title}</Text>
      <Text style={{ margin: 10 }}>{note.text}</Text>
      <View
        style={{
          backgroundColor: "#7CA1B4",
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {note.tags.map((tag, index) => {
          return (
            <Text
              key={index}
              style={{
                margin: 10,
                color: colors[Math.floor(Math.random() * colors.length)],
              }}
            >
              {tag}
            </Text>
          );
        })}
      </View>

      <Text style={{ margin: 10 }}>{note.creation_date}</Text>
    </View>
  );
}
