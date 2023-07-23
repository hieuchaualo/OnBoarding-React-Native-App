import { API_BASE_URI } from "../constants"

const timestampToDate = (timestamp: string | number | Date) => new Date(timestamp)
    .toLocaleString('en-GB', { hour12: false, })
    .replace(',', ' -')

const toImgUrl = (path?: string) => `${API_BASE_URI}/${path}`

export {
    timestampToDate,
    toImgUrl,
}