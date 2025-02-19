import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { fromSecondToDateTime } from '../../../utils'
import { Column, Row } from '../../../components'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeColors, ThemeDimensions } from '../../../constants'

type TimeCountdownProps = {
    timeRemainingInSecond?: number,
    style: object,
    handleOnTimeout: Function,
    isReverse?: boolean, // able to count increment after timeout
}

function TimeCountdown({ timeRemainingInSecond, style, handleOnTimeout, isReverse }: TimeCountdownProps) {
    const [timeCountdown, setTimeCountdown] = useState(Number.MAX_SAFE_INTEGER)

    useEffect(() => {
        setTimeCountdown(timeRemainingInSecond ?? 0)
    }, [timeRemainingInSecond])

    useEffect(() => {
        let interval: (string | number | NodeJS.Timeout | undefined) = 0
        if (timeCountdown === 0) handleOnTimeout()
        if (isReverse) {
            interval = setInterval(() => setTimeCountdown(timeCountdown + 1), 1000);
        } else if (timeCountdown > 0) {
            interval = setInterval(() => setTimeCountdown(timeCountdown - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timeCountdown])

    return (
        <Row>
            <MaterialIcons
                name={timeCountdown === 0 ? 'timer-off' : 'timer'}
                size={ThemeDimensions.positive4}
                color={ThemeColors.third}
                style={{ paddingEnd: ThemeDimensions.positive1 }}
            />
            <Text style={style}>
                {timeCountdown === 0 ? "Time out!" : fromSecondToDateTime(timeCountdown)}
            </Text>
        </Row>
    )
}

export { TimeCountdown }