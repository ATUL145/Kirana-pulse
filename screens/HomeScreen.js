import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../components/Home";
import History from "../components/History";
import Feedback from "../components/Feedback";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../components/header";
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const CustomTabBar = ({ navigation, state, descriptors }) => {
    return (
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          if (route.name === "Home") {
            iconName = isFocused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = isFocused ? "time" : "time-outline";
          } else if (route.name === "Feedback") {
            iconName = isFocused ? "chatbubble" : "chatbubble-outline";
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabBarButton,
                {
                  backgroundColor: isFocused ? "skyblue" : "#8957b8",
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={30}
                color={isFocused ? "white" : "black"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ username: username }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default HomeScreen;
