/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
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

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
