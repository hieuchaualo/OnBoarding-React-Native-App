import React from "react"
import { ActivityIndicator, Text, View, ViewStyle } from "react-native"
import { ThemeColors, ThemeDimensions, ThemeFonts } from "../../constants"

const LoadingView = () => {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={ThemeColors.primary} />
            <Text style={{ fontSize: ThemeDimensions.fontSize.xl, color: ThemeColors.primary, fontFamily: ThemeFonts.regular }}>
                { } Loading
            </Text>
        </View>
    )
}

export {
    LoadingView,
}