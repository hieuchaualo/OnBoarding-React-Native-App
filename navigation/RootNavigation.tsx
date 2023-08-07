import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Exercises,
  HomeScreen,
  LoginScreen,
  MinitestScreen,
  RegisterScreen,
  Result,
  TestHistory,
  WelcomeScreen,
  QuizGame,
  HowToPlayQuizGame,
  PlayQuizGame,
} from "../screens";

import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import NhapScreen from "../screens/NhapScreen";
import BlogScreen from "../screens/BlogScreen";
import DetailBlogScreen from "../screens/DetailBlogScreen";
import { RootStackName, ThemeColors } from "../constants";
import { RootStackParamList } from "../types";


/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
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
          <RootStack.Screen name={RootStackName.Login} component={LoginScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.Register} component={RegisterScreen} />
          <RootStack.Screen name={RootStackName.Home} component={HomeScreen} options={{ gestureEnabled: false }} />
          <RootStack.Screen name={RootStackName.ForgotPassword} component={ForgotPasswordScreen} />
          <RootStack.Screen name={RootStackName.Exercises} component={Exercises} options={{ freezeOnBlur: true }} />
          <RootStack.Screen name={RootStackName.Setting} component={SettingScreen} />
          <RootStack.Screen name={RootStackName.Blog} component={BlogScreen} />
          <RootStack.Screen name={RootStackName.MiniTest} component={MinitestScreen} />
          <RootStack.Screen name={RootStackName.Result} component={Result} />
          <RootStack.Screen name={RootStackName.DetailBlog} component={DetailBlogScreen} />
          <RootStack.Screen name={RootStackName.QuizGame} component={QuizGame} />
          <RootStack.Screen name={RootStackName.HowToPlayQuizGame} component={HowToPlayQuizGame} />
          <RootStack.Screen name={RootStackName.PlayQuizGame} component={PlayQuizGame} />
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
          <RootStack.Screen
            name={RootStackName.Nhap}
            component={NhapScreen}
            options={{ animation: 'none' }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView >
  );
}
