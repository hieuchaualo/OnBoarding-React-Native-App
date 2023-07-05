/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import { RootStackParamList } from "../types";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NhapScreen from "../screens/NhapScreen";
import BlogScreen from "../screens/BlogScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Nhap" component={NhapScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />

    </Stack.Navigator>
  );
}
