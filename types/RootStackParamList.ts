
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
  Profile: undefined;
  ProfileUpdate: undefined;
  Setting: undefined;
  QuizGame: undefined;
  PlayQuizGame: undefined;
  HowToPlayQuizGame: undefined;
  ReadingTip: undefined;
  ReadingTipDetail: {
    readingTipId: string,
  };
  MiniTest: undefined;
  TestHistory: undefined;
  Exercises: {
    miniTestId: string,
  };
  Result: {
    miniTestId: string,
    finalAnswers: string[],
    finalAnswersForm: string[],
    totalTime: number,
    timeLimit: number,
  };
};
