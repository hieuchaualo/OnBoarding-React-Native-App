import React, { FunctionComponent, ReactNode, useState } from "react"
import { Pressable, Text, TextStyle, ViewStyle } from "react-native"
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../../constants";

type ButtonProps = {
    title?: string;
    background?: ThemeColors;
    backgroundHover?: ThemeColors;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    children?: ReactNode;
    onPress: VoidFunction;
}

const Button: FunctionComponent<ButtonProps> = ({
    style, titleStyle, title, children, background, backgroundHover, onPress
}) => {
    const [backgroundColor, setBackgroundColor] = useState(background ?? ThemeColors.primary)
    const handleOnPressIn = () => setBackgroundColor(backgroundHover ?? ThemeColors.primaryLight)
    const handleOnPressOut = () => setBackgroundColor(background ?? ThemeColors.primary)

    return (
        <Pressable
            style={{
                backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: ThemeDimensions.positive1,
                ...style
            }}
            onPress={onPress}
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
        >
            {title
                ? <Text style={{
                    color: ThemeColors.light,
                    fontSize: ThemeDimensions.fontSize.lg,
                    fontFamily: ThemeFonts.bold,
                    ...titleStyle
                }}>
                    {title}
                </Text>
                : children
            }
        </Pressable>
    )
}

export {
    Button,
}