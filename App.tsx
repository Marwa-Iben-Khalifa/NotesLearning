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
import { useEffect, useState } from "react";
import { LoginContext, NotesContext } from "./src/utils/context";
import { INote } from "./src/utils/types";
import DataService from "./src/Services/Api";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [allNotes, setAllNotes] = useState([] as INote[]);
  const [reloadNotes, setReloadNotes] = useState(false);

  const handleNotes = async () => {
    const response = await DataService.getAll();
    console.log(response.data.length);
    setAllNotes(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    setReloadNotes((old) => !old);
  }, []);

  useEffect(() => {
    console.log("i am reloading");
    handleNotes();
  }, [reloadNotes]);

  return (
    <LoginContext.Provider value={{ authorName, setAuthorName }}>
      <NotesContext.Provider
        value={{ allNotes, setAllNotes, reloadNotes, setReloadNotes }}
      >
        <NavigationContainer>
          {isDisconnected ? (
            <AccessPage setIsDisconnected={setIsDisconnected} />
          ) : (
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
                  },
                }}
              />
              <Tab.Screen
                name="Notes"
                component={Notes}
                options={{
                  tabBarIcon: ({ color, size, focused }) => {
                    return <Feather name="list" size={30} />;
                  },
                }}
              />
              <Tab.Screen
                name="My Notes"
                component={MyNotes}
                options={{
                  tabBarIcon: ({ color, size, focused }) => {
                    return <Feather name="activity" size={30} />;
                  },
                }}
              />
              <Tab.Screen
                name="New"
                component={Detail}
                options={{
                  tabBarIcon: ({ color, size, focused }) => {
                    return <Feather name="plus" size={30} />;
                  },
                }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </NotesContext.Provider>
    </LoginContext.Provider>
  );
}
