import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import Colors from "../../constants/Colors"

const LoadingView = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text style={{ fontSize: 32, color: Colors.primary, }}>
                { } Loading
            </Text>
        </View>
    )
}

export {
    LoadingView,
}