import React from "react";
import { View, TextInput } from "react-native";
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../../../constants";

type AnswerByTextInputProps = {
  quizIndex: number;
  answer: string;
  handleOnAnswer: Function;
  optionStyle?: object;
  optionTextStyle?: object;
}

const focusedStyle = {
  backgroundColor: ThemeColors.light,
  borderColor: ThemeColors.primaryDark,
  color: ThemeColors.primary,
}

const blurredStyle = {
  backgroundColor: ThemeColors.light,
  borderColor: ThemeColors.grey,
  color: ThemeColors.secondary,
}

const AnswerByTextInput = (props: AnswerByTextInputProps) => {
  const {
    quizIndex,
    answer,
    handleOnAnswer,
  } = props;

  const [focused, setFocused] = React.useState<boolean>(false);

  return (
    <View>
      <TextInput
        placeholder="Type your answer..."
        cursorColor={ThemeColors.primaryDark}
        selectionColor={ThemeColors.pinkLight}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={text => handleOnAnswer(quizIndex, text)}
        value={answer}
        style={{
          borderWidth: 2,
          borderRadius: ThemeDimensions.positive1,
          paddingHorizontal: ThemeDimensions.positive2,
          paddingVertical: ThemeDimensions.positive1,
          marginTop: ThemeDimensions.positive1,
          fontFamily: ThemeFonts.semiBold,
          fontSize: ThemeDimensions.fontSize.lg,
          ...(focused ? focusedStyle : blurredStyle),
        }}
      />
    </View>
  )
}

export {
  AnswerByTextInput
}