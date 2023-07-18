/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";

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
  Exercises: undefined;
  Profile: undefined;
  Setting: undefined;
  Nhap: undefined;
  Blog: undefined;
  QuizGame: undefined;
  DetailBlog: undefined;
  MiniTest: undefined;
  HowPlay: undefined;
  Game2: undefined;
  Result: { 
    finalAnswers: string[],
    finalAnswersForm: string[],
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
