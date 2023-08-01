import React, { FunctionComponent, ReactNode } from "react"
import { View, ViewStyle } from "react-native"

type ColumnProps = {
    children: ReactNode;
    style?: ViewStyle; 
}

const Column: FunctionComponent<ColumnProps> = ({ style, children }) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        }}>
            {children}
        </View>
    )
}

export {
    Column,
}