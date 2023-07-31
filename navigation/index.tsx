/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/login/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import Welcome from "../screens/welcome/WelcomeScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ExercisesScreen from "../screens/exercises/Exercises";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import { RootStackParamList } from "./types";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NhapScreen from "../screens/NhapScreen";
import BlogScreen from "../screens/BlogScreen";
import MinitestScreen from "../screens/mini-test/Minitest";
import ResultScreen from "../screens/result/ResultScreen";
import DetailBlogScreen from "../screens/DetailBlogScreen";
import QuizGameScreen from "../screens/QuizGameScreen";
import HowPlayScreen from "../screens/HowPlayScreen";
import Game2Screen from "../screens/Game2Screen";
import TestHistoryScreen from "../screens/TestHistory/TestHistory";

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
      <Stack.Screen name="Home" component={HomeScreen} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Exercises" component={ExercisesScreen} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Nhap" component={NhapScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="MiniTest" component={MinitestScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="DetailBlog" component={DetailBlogScreen} />
      <Stack.Screen name="QuizGame" component={QuizGameScreen} />
      <Stack.Screen name="HowPlay" component={HowPlayScreen} />
      <Stack.Screen name="Game2" component={Game2Screen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="TestHistory" component={TestHistoryScreen} />
    </Stack.Navigator>
  );
}
