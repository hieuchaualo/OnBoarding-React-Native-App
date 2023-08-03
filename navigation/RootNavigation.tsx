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
  TestHistory,
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

enum RootStackName {
  Welcome = "Welcome",
  Login = "Login",
  Register = "Register",
  Home = "Home",
  ForgotPassword = "ForgotPassword",
  NewPassword = "NewPassword",
  Exercises = "Exercises",
  Profile = "Profile",
  Setting = "Setting",
  Nhap = "Nhap",
  Blog = "Blog",
  QuizGame = "QuizGame",
  DetailBlog = "DetailBlog",
  MiniTest = "MiniTest",
  HowPlay = "HowPlay",
  Game2 = "Game2",
  TestHistory = "TestHistory",
  Result = "Result",
}

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
          <RootStack.Screen name={RootStackName.Welcome} component={WelcomeScreen} />
          <RootStack.Screen name={RootStackName.Login} component={LoginScreen} />
          <RootStack.Screen name={RootStackName.Register} component={RegisterScreen} />
          <RootStack.Screen name={RootStackName.Home} component={HomeScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.ForgotPassword} component={ForgotPasswordScreen} />
          <RootStack.Screen name={RootStackName.Exercises} component={ExercisesScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.Setting} component={SettingScreen} />
          <RootStack.Screen name={RootStackName.Nhap} component={NhapScreen} />
          <RootStack.Screen name={RootStackName.Blog} component={BlogScreen} />
          <RootStack.Screen name={RootStackName.MiniTest} component={MinitestScreen} />
          <RootStack.Screen name={RootStackName.Result} component={ResultScreen} />
          <RootStack.Screen name={RootStackName.DetailBlog} component={DetailBlogScreen} />
          <RootStack.Screen name={RootStackName.QuizGame} component={QuizGameScreen} />
          <RootStack.Screen name={RootStackName.HowPlay} component={HowPlayScreen} />
          <RootStack.Screen name={RootStackName.Game2} component={Game2Screen} options={{ gestureEnabled: false }} />
          <RootStack.Screen
            name={RootStackName.TestHistory}
            component={TestHistory}
            options={{ animation: 'none' }}
          />
          <RootStack.Screen
            name={RootStackName.Profile}
            component={ProfileScreen}
            options={{ animation: 'none' }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView >
  );
}

export {
  RootStackName,
  RootNavigator,
  RootStackParamList,
}
