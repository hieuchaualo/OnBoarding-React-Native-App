import { API_BASE_URI } from "../constants"

const timestampToDate = (timestamp: string | number | Date) => new Date(timestamp)
    .toLocaleString('en-GB', { hour12: false, })
    .replace(',', ' -')

const toImgUrl = (path?: string) => `${API_BASE_URI}/${path}`

const fromSecondToDateTime = (second = 0) => {
    const _minutes = Math.floor((second % 3600) / 60 % 60)
    const _seconds = Math.floor((second % 86400) % 60)
    return `${_minutes < 10 ? ('0' + _minutes) : _minutes}m ${_seconds < 10 ? ('0' + _seconds) : _seconds}s`
}

export {
    timestampToDate,
    fromSecondToDateTime,
    toImgUrl,
}