import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Colors from "../../../constants/Colors";

const TRUE_FALSE_OPTIONS = ["TRUE", "FALSE", "NOT GIVEN"];

type AnswerByOptionsProps = {
  quizIndex: number;
  options: string[];
  answersForm: string[];
  handleOnAnswer: Function;
  optionStyle?: object;
  optionTextStyle?: object;
}

const AnswerByOptions = (props: AnswerByOptionsProps) => {
  const {
    quizIndex,
    options,
    answersForm,
    handleOnAnswer,
    optionStyle,
    optionTextStyle,
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
              style={[
                optionStyle,
                answersForm[quizIndex] === option
                  ? { backgroundColor: Colors.blue }
                  : { backgroundColor: Colors.gray, },
              ]}
            >
              <Text
                style={[
                  optionTextStyle,
                  answersForm[quizIndex] === option
                    ? { color: '#FFF' }
                    : { borderBottomColor: Colors.gray },
                ]}
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