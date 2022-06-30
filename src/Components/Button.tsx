
import React from 'react'
import { TouchableOpacity, Text, ViewStyle, StyleSheet} from "react-native";

export default function BasicButton({
  children,
  onPressed,
  style = {}
}: {
    children?: React.ReactNode;
    onPressed: () => void;
    style?:  ViewStyle;
}) {
  return (
    <TouchableOpacity style={{padding:20, margin:10, borderRadius:20,backgroundColor:"#046C95", ...style}} onPress={onPressed}>
      <Text style={{fontWeight:'bold', }}>
      {children}
      </Text>
    </TouchableOpacity>
  )
}