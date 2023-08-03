import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { ThemeColors, ThemeDimensions } from "../../constants"

const LoadingView = () => {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={ThemeColors.primary} />
            <Text style={{ fontSize: ThemeDimensions.fontSize.xl, color: ThemeColors.primary, }}>
                { } Loading
            </Text>
        </View>
    )
}

export {
    LoadingView,
}