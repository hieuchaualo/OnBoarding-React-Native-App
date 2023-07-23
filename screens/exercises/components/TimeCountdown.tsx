import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { fromSecondToDateTime } from '../../../utils'

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
        <Text style={style}>
            {fromSecondToDateTime(timeCountdown)}
        </Text>
    )
}

export { TimeCountdown }