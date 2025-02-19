import { StyleSheet } from "react-native";
import { ThemeColors } from "./theme-colors";
import { ThemeDimensions } from "./theme-dimensions";
import { ThemeFonts } from "./theme-fonts";

export const ThemeStyles = StyleSheet.create({
  buttonPrimaryLg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.primary,
    borderRadius: ThemeDimensions.positive2,
  },
  buttonPrimaryLgText: {
    color: ThemeColors.light,
    fontSize: ThemeDimensions.fontSize.lg,
    fontFamily: ThemeFonts.bold,
  },

  buttonLightLg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.white,
    borderRadius: ThemeDimensions.positive2,
  },
  buttonLightLgText: {
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.lg,
    fontFamily: ThemeFonts.bold,
  },

  h1: {
    textAlign: "center",
    color: ThemeColors.primary,
    fontSize: ThemeDimensions.fontSize.xxxl,
    fontFamily: ThemeFonts.bold,
  },
  h2: {
    textAlign: "center",
    color: ThemeColors.primary,
    fontSize: ThemeDimensions.fontSize.xxl,
    fontFamily: ThemeFonts.bold,
  },
  h3: {
    textAlign: "center",
    color: ThemeColors.primary,
    fontSize: ThemeDimensions.fontSize.xl,
    fontFamily: ThemeFonts.bold,
  },
  h4: {
    textAlign: "center",
    color: ThemeColors.primary,
    fontSize: ThemeDimensions.fontSize.lg,
    fontFamily: ThemeFonts.bold,
  },
  h5: {
    textAlign: "center",
    color: ThemeColors.primary,
    fontSize: ThemeDimensions.fontSize.md,
    fontFamily: ThemeFonts.bold,
  },
  b1: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.xxxl,
    fontFamily: ThemeFonts.semiBold,
  },
  b2: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.xxl,
    fontFamily: ThemeFonts.semiBold,
  },
  b3: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.xl,
    fontFamily: ThemeFonts.semiBold,
  },
  b4: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.lg,
    fontFamily: ThemeFonts.semiBold,
  },
  b5: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.md,
    fontFamily: ThemeFonts.semiBold,
  },
  c1: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.xxxl,
    fontFamily: ThemeFonts.regular,
  },
  c2: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.xxl,
    fontFamily: ThemeFonts.regular,
  },
  c3: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.xl,
    fontFamily: ThemeFonts.regular,
  },
  c4: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.lg,
    fontFamily: ThemeFonts.regular,
  },
  c5: {
    textAlign: "left",
    color: ThemeColors.dark,
    fontSize: ThemeDimensions.fontSize.md,
    fontFamily: ThemeFonts.regular,
  },
});