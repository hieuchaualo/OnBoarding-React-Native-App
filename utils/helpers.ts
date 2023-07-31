import { API_BASE_URI } from "../constants"

const timestampToDate = (timestamp: string | number | Date) => new Date(timestamp)
    .toLocaleString('en-GB', { hour12: false, })
    .replace(',', ' -')

const toImgUrl = (path?: string) => `${API_BASE_URI}/${path}`

const fromSecondToDateTime = (second = 0) => `${Math.floor(second / 3600)}h ${Math.floor((second % 86400) / 60 % 60)}m ${Math.floor((second % 86400) % 60)}s`

export {
    timestampToDate,
    fromSecondToDateTime,
    toImgUrl,
}