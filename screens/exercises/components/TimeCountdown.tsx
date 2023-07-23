import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import Colors from '../../../constants/Colors'

type TimeCountdownProps = {
    timeRemainingInSecond: number,
    style: object,
    handleOnTimeout: Function,
    isReverse?: boolean, // able to count increment after timeout
}

function TimeCountdown({ timeRemainingInSecond, style, handleOnTimeout, isReverse }: TimeCountdownProps) {
    const [timeCountdown, setTimeCountdown] = useState(Number.MAX_SAFE_INTEGER)

    useEffect(() => {
        setTimeCountdown(timeRemainingInSecond)
    }, [timeRemainingInSecond])

    useEffect(() => {
        let interval: (string | number | NodeJS.Timeout | undefined) = 0
        if (!isReverse && timeCountdown === 0) handleOnTimeout()
        if (isReverse) {
            interval = setInterval(() => setTimeCountdown(timeCountdown + 1), 1000);
        } else if (timeCountdown > 0) {
            interval = setInterval(() => setTimeCountdown(timeCountdown - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timeCountdown])

    return (
        <Text style={{ ...style, ...(isReverse && { color: Colors.danger }) }}>
            {isReverse && '- '}
            {Math.floor(timeCountdown / 3600)}h { }
            {Math.floor((timeCountdown % 86400) / 60 % 60)}m { }
            {Math.floor((timeCountdown % 86400) % 60)}s { }
        </Text>
    )
}

export { TimeCountdown }