import React, { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { View, TextInput, Pressable } from "react-native";
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../../../constants";

type PasswordFieldProps = {
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

const PasswordField = (props: PasswordFieldProps) => {
  const { handleOnChange, value, editable = true } = props;

  const [focused, setFocused] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleOnPress = () => setIsShow(!isShow)

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TextInput
        cursorColor={ThemeColors.primaryDark}
        selectionColor={ThemeColors.pinkLight}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={handleOnChange}
        value={value}
        editable={editable}
        maxLength={32}
        secureTextEntry={!isShow}
        style={{
          width: ThemeDimensions.percentage85,
          borderWidth: 2,
          borderTopLeftRadius: ThemeDimensions.positive1,
          borderBottomLeftRadius: ThemeDimensions.positive1,
          paddingHorizontal: ThemeDimensions.positive2,
          paddingVertical: ThemeDimensions.positive1,
          marginTop: ThemeDimensions.positive1,
          fontFamily: ThemeFonts.regular,
          fontSize: ThemeDimensions.fontSize.lg,
          ...(focused ? focusedStyle : blurredStyle),
        }}
      />
      <Pressable
        onPress={handleOnPress}
        style={{
          width: ThemeDimensions.percentage15,
          borderWidth: 2,
          borderStartWidth: 0,
          borderTopRightRadius: ThemeDimensions.positive1,
          borderBottomRightRadius: ThemeDimensions.positive1,
          paddingHorizontal: ThemeDimensions.positive2,
          paddingVertical: ThemeDimensions.positive1,
          marginTop: ThemeDimensions.positive1,
          borderColor: ThemeColors.grey,
          backgroundColor: ThemeColors.grey,
        }}
      >
        <Feather name={isShow ? "eye" : "eye-off"} size={ThemeDimensions.fontSize.xl} color={ThemeColors.secondary} style={{ paddingTop: 3 }} />
      </Pressable>
    </View>
  )
}

export {
  PasswordField
}