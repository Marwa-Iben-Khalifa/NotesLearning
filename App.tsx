import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccessPage from "./src/Futures/AccessPage";
import Home from "./src/Futures/Home";
import Detail from "./src/Futures/New";
import MyNotes from "./src/Futures/MyNotes";
import Notes from "./src/Futures/Notes";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isDisconnected, setIsDisconnected]=useState(true)
  return (
  <>
    {isDisconnected ?
    
      <AccessPage  setIsDisconnected={setIsDisconnected} />
    
    :
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <Feather name="home" size={30} />;
          }
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <Feather name="list" size={30} />;
          }
        }}
      />
      <Tab.Screen
        name="My Notes"
        component={MyNotes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <Feather name="activity" size={30} />;
          }
        }}
      />
      <Tab.Screen
        name="New"
        component={Detail}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <Feather name="plus" size={30} />;
          }
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
}
</>
      );
     
}
