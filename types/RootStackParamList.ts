
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
  ReadingTip: undefined;
  ReadingTipDetail: {
    readingTipId: string,
  };
  QuizGame: undefined;
  PlayQuizGame: undefined;
  HowToPlayQuizGame: undefined;
  MiniTest: undefined;
  TestHistory: undefined;
  Result: {
    miniTestId: string,
    finalAnswers: string[],
    finalAnswersForm: string[],
    totalTime: number,
    timeLimit: number,
  };
};
