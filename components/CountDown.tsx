import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { ThemeColors } from "../constants"

const LoadingView = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={ThemeColors.primary} />
            <Text style={{ fontSize: 32, color: ThemeColors.primary, }}>
                { } Loading
            </Text>
        </View>
    )
}

export {
    LoadingView,
}