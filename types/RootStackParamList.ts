
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;

  Profile: undefined;
  ProfileUpdate: undefined;

  Notification: undefined;

  QuizGame: undefined;
  PlayQuizGame: undefined;
  HowToPlayQuizGame: undefined;

  ReadingTip: undefined;
  ReadingTipDetail: {
    readingTipId: string,
  };

  TestHistory: undefined;

  MiniTest: undefined;
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
