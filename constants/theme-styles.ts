import { StyleSheet } from "react-native";
import { ThemeColors } from "./theme-colors";
import { ThemeDimensions } from "./theme-dimensions";
import { ThemeFonts } from "./theme-fonts";

export const ThemeStyles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: ThemeColors.primary,
    padding: ThemeDimensions.positive[1],
    borderRadius: ThemeDimensions.positive[1],
  },
  buttonPrimaryText: {
    textAlign: "center",
    fontSize: ThemeDimensions.fontSize.xl,
    fontFamily: ThemeFonts.bold,
    color: ThemeColors.light,
  }
});