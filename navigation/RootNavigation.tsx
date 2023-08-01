import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ExercisesScreen,
  HomeScreen,
  LoginScreen,
  MinitestScreen,
  RegisterScreen,
  ResultScreen,
  TestHistoryScreen,
  WelcomeScreen,
} from "../screens";

import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import NhapScreen from "../screens/NhapScreen";
import BlogScreen from "../screens/BlogScreen";
import DetailBlogScreen from "../screens/DetailBlogScreen";
import QuizGameScreen from "../screens/QuizGameScreen";
import HowPlayScreen from "../screens/HowPlayScreen";
import Game2Screen from "../screens/Game2Screen";
import { ThemeColors } from "../constants";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
  Exercises: {
    miniTestId: string,
  };
  Profile: undefined;
  Setting: undefined;
  Nhap: undefined;
  Blog: undefined;
  QuizGame: undefined;
  DetailBlog: undefined;
  MiniTest: undefined;
  HowPlay: undefined;
  Game2: undefined;
  TestHistory: undefined;
  Result: {
    miniTestId: string,
    finalAnswers: string[],
    finalAnswersForm: string[],
    totalTime: number,
    timeLimit: number,
  };
};

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={ThemeColors.light}
        barStyle={'dark-content'}
      />
      <NavigationContainer theme={{
        ...DefaultTheme, colors: {
          ...DefaultTheme.colors,
          background: ThemeColors.white,
          primary: ThemeColors.primary,
        }
      }}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Welcome" component={WelcomeScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="Home" component={HomeScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <RootStack.Screen name="Exercises" component={ExercisesScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name="Profile" component={ProfileScreen} />
          <RootStack.Screen name="Setting" component={SettingScreen} />
          <RootStack.Screen name="Nhap" component={NhapScreen} />
          <RootStack.Screen name="Blog" component={BlogScreen} />
          <RootStack.Screen name="MiniTest" component={MinitestScreen} />
          <RootStack.Screen name="Result" component={ResultScreen} />
          <RootStack.Screen name="DetailBlog" component={DetailBlogScreen} />
          <RootStack.Screen name="QuizGame" component={QuizGameScreen} />
          <RootStack.Screen name="HowPlay" component={HowPlayScreen} />
          <RootStack.Screen name="Game2" component={Game2Screen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name="TestHistory" component={TestHistoryScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView >
  );
}

export {
  RootNavigator,
  RootStackParamList,
}
