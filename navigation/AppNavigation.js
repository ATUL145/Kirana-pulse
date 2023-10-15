import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/LoginScreen";
import StoreScreen from "../screens/StoreScreen";
const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
