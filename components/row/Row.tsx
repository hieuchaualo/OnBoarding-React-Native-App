import React, { FunctionComponent, ReactNode } from "react"
import { View, ViewStyle } from "react-native"

type RowProps = {
    children: ReactNode;
    style?: ViewStyle; 
}

const Row: FunctionComponent<RowProps> = ({ style, children }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        }}>
            {children}
        </View>
    )
}

export {
    Row,
}