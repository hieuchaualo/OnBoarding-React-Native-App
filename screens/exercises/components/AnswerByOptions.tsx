import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../../../constants";

const TRUE_FALSE_OPTIONS = ["True", "False", "Not given"];

type AnswerByOptionsProps = {
  quizIndex: number;
  options: string[];
  answersForm: string[];
  handleOnAnswer: Function;
}

const AnswerByOptions = (props: AnswerByOptionsProps) => {
  const {
    quizIndex,
    options,
    answersForm,
    handleOnAnswer,
  } = props;

  const internalOptions = options.length ? options : TRUE_FALSE_OPTIONS;

  return (
    <View>
      {internalOptions.map((option: string) => (
        <View key={option}>
          <TouchableWithoutFeedback
            onPress={() => handleOnAnswer(quizIndex, option)}
          >
            <View
              style={{
                backgroundColor: answersForm[quizIndex] === option ? ThemeColors.primary : ThemeColors.light,
                paddingVertical: ThemeDimensions.positive1,
                paddingHorizontal: ThemeDimensions.positive2,
                borderRadius: ThemeDimensions.positive1,
                marginVertical: ThemeDimensions.positive1 / 2,
              }}
            >
              <Text
                style={{
                  color: answersForm[quizIndex] === option ? ThemeColors.light : ThemeColors.third,
                  fontFamily: ThemeFonts.semiBold,
                  fontSize: ThemeDimensions.fontSize.lg,
                }}
              >
                {option}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
    </View>
  )
}

export {
  AnswerByOptions
}