import {
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getMiniTestById } from "../../api";
import { IMiniTest, MiniTestTypes } from "../../interfaces";
import { Button, Column, LoadingView, Row } from "../../components";
import { toImgUrl } from "../../utils";
import { AnswerByOptions, AnswerByTextInput, TimeCountdown } from "./components";
import { ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from "../../constants";
import { RootStackParamList } from "../../types";

type ExercisesProps = NativeStackScreenProps<RootStackParamList, "Exercises">;

const Exercises: React.FC<ExercisesProps> = ({ route, navigation }) => {
  const { miniTestId } = route.params;
  const { navigate } = navigation;

  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);

  const [answersForm, setAnswersForm] = React.useState([""]);
  const [miniTest, setMiniTest] = React.useState<IMiniTest>();

  useEffect(() => {
    const fetchMiniTestById = async () => {
      const response = await getMiniTestById(miniTestId);
      if (response.status === 200) {
        const miniTestData: IMiniTest = response.data.data
        setMiniTest(miniTestData);
        setAnswersForm(Array(miniTestData.quizzes?.length).fill(""));
      }
    }
    fetchMiniTestById()
    return () => setMiniTest(undefined)
  }, [miniTestId]);

  useEffect(() => {
    const interval = setInterval(() => setTotalTime(totalTime + 1), 1000);
    return () => clearInterval(interval);
  }, [totalTime])

  const handleOnAnswer = (quizIndex: number, option: string) => {
    const newAnswerForm = answersForm.map((answerValue, answersIndex) =>
      answersIndex === quizIndex ? option : answerValue
    );
    setAnswersForm(newAnswerForm);
  }

  const handleOnTimeout = () => {
    setIsTimeout(true)
  }

  if (!miniTest) return (
    <View style={{
      paddingTop: ThemeDimensions.windowHeight40,
      backgroundColor: ThemeColors.light,
      height: ThemeDimensions.windowHeight,
    }}>
      <LoadingView />
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <ScrollView>
        <Image
          style={{
            aspectRatio: 16 / 9,
            width: ThemeDimensions.percentage100,
            resizeMode: 'cover',
          }}
          source={{ uri: toImgUrl(miniTest.thumbnail) }}
        />
        <View style={{ paddingHorizontal: ThemeDimensions.positive3, paddingTop: ThemeDimensions.positive3 }}>
          <Text style={{ ...ThemeStyles.h2, textAlign: 'left', color: ThemeColors.third }} selectable={true}>
            {miniTest.title}
          </Text>

          <Text style={{
            ...ThemeStyles.c4,
            color: ThemeColors.secondary,
            marginBottom: ThemeDimensions.positive2,
          }}>
            {(typeof miniTest.creator === "object") && '# ' + miniTest.creator.name}
          </Text>

          <Text style={{ ...ThemeStyles.c4 }} selectable={true}>
            {miniTest.content}
          </Text>
        </View>

        <View style={{ paddingHorizontal: ThemeDimensions.positive2 }}>
          {miniTest.quizzes?.map((quiz, quizIndex) => (
            <View key={quiz._id} style={{
              padding: ThemeDimensions.positive2,
              borderRadius: ThemeDimensions.positive1,
              backgroundColor: ThemeColors.white,
              marginVertical: ThemeDimensions.positive1,
            }}>
              <Text style={{
                ...ThemeStyles.c4,
                fontFamily: ThemeFonts.semiBold,
                color: ThemeColors.third,
                paddingHorizontal: ThemeDimensions.positive1
              }} >
                {quizIndex + 1}. {quiz.question}
              </Text>

              {miniTest.typeOfQuiz === MiniTestTypes.FillTheBlank
                ? <AnswerByTextInput
                  quizIndex={quizIndex}
                  answer={answersForm[quizIndex]}
                  handleOnAnswer={handleOnAnswer}
                />
                : <AnswerByOptions
                  quizIndex={quizIndex}
                  options={quiz.options}
                  answersForm={answersForm}
                  handleOnAnswer={handleOnAnswer}
                />
              }
            </View>
          ))}
        </View>
      </ScrollView>

      <Row style={{
        paddingHorizontal: ThemeDimensions.positive4,
        paddingVertical: ThemeDimensions.positive1,
        backgroundColor: ThemeColors.white,
        borderTopColor: ThemeColors.grey,
        borderTopWidth: 1,
      }}>
        <Column>
          {miniTest.timeLimit
            ? <TimeCountdown
              style={{ ...ThemeStyles.c4, }}
              timeRemainingInSecond={miniTest.timeLimit}
              handleOnTimeout={handleOnTimeout}
              isReverse={false}
            />
            : <Text style={{ ...ThemeStyles.c4, }}>
              Unlimited time
            </Text>
          }
        </Column>

        <Button
          title={isTimeout ? "Timeout!" : "Submit"}
          onPress={() => {
            navigate(
              "Result",
              {
                finalAnswers: miniTest.quizzes?.map(quiz => quiz.answers[0]) ?? [],
                finalAnswersForm: answersForm,
                totalTime,
                miniTestId: miniTest._id,
                timeLimit: miniTest.timeLimit ?? 0,
              }
            );
          }}
          style={{
            paddingHorizontal: ThemeDimensions.positive4,
            paddingVertical: ThemeDimensions.positive1,
          }}
        />
      </Row>
    </View>
  );
};

export { Exercises };