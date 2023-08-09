import React from "react";
import { View, TextInput } from "react-native";
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../../../constants";

type TextFieldProps = {
  handleOnChange: (value: string) => void;
  value: string;
  editable?: boolean;
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

const TextField = (props: TextFieldProps) => {
  const { handleOnChange, value, editable = true } = props;

  const [focused, setFocused] = React.useState<boolean>(false);

  return (
    <View>
      <TextInput
        cursorColor={ThemeColors.primaryDark}
        selectionColor={ThemeColors.pinkLight}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={handleOnChange}
        value={value}
        editable={editable}
        maxLength={32}
        style={{
          borderWidth: 2,
          borderRadius: ThemeDimensions.positive1,
          paddingHorizontal: ThemeDimensions.positive2,
          paddingVertical: ThemeDimensions.positive1,
          marginTop: ThemeDimensions.positive1,
          fontFamily: ThemeFonts.regular,
          fontSize: ThemeDimensions.fontSize.lg,
          ...(focused ? focusedStyle : blurredStyle),
        }}
      />
    </View>
  )
}

export {
  TextField
}