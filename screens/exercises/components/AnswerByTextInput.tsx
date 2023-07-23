import React from "react";
import { View, TextInput } from "react-native";
import Spacing from "../../../constants/Spacing";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";

type AnswerByTextInputProps = {
  quizIndex: number;
  answer: string;
  handleOnAnswer: Function;
  optionStyle?: object;
  optionTextStyle?: object;
}

const focusedStyle = {
  borderWidth: 2,
  borderColor: Colors.primary,
  borderRadius: Spacing,
  paddingHorizontal: 16,
  paddingVertical: 8,
  fontSize: 20,
}

const blurredStyle = {
  borderWidth: 2,
  borderColor: Colors.primary,
  borderRadius: Spacing,
  paddingHorizontal: 16,
  paddingVertical: 8,
  fontSize: 20,
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={text => handleOnAnswer(quizIndex, text)}
        value={answer}
        style={focused ? focusedStyle : blurredStyle}
      />
    </View>
  )
}

export {
  AnswerByTextInput
}