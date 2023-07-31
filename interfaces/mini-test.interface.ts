import { IQuiz } from './quiz.interface';
import { IAccount } from './account.interface';
import { MiniTestTypes } from './mini-test-types.enum';

export interface IMiniTest {
  _id: string;
  title?: string;
  content?: string;
  typeOfQuiz?: string | MiniTestTypes;
  quizzes?: IQuiz[];
  timeLimit?: number;
  thumbnail?: string;
  creator?: string | IAccount;
}

export default IMiniTest;
