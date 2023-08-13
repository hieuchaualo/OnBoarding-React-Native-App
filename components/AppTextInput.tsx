import {
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../constants";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={ThemeColors.secondary}
      style={[
        {
          fontFamily: ThemeFonts.regular,
          fontSize: ThemeDimensions.fontSize.md,
          padding: ThemeDimensions.positive3,
          backgroundColor: ThemeColors.grey,
          borderRadius: ThemeDimensions.positive1,
          marginVertical: ThemeDimensions.positive2,
        },
        focused && {
          borderWidth: 2,
          borderColor: ThemeColors.primary,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
