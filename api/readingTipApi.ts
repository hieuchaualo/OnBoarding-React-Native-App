import { axiosInstance } from "./apiInstance"

function getReadingTipsList(page?: number) {
  return axiosInstance.get('/reading-tips', { params: { page } })
}

function getReadingTipById(id: string) {
  return axiosInstance.get('/reading-tips/' + id)
}

function getNextReadingTipById(id: string) {
  return axiosInstance.get('/reading-tips/next',{ params: { id } })
}

function getPreviousReadingTipById(id: string) {
  return axiosInstance.get('/reading-tips/previous',{ params: { id } })
}

export {
  getReadingTipById,
  getReadingTipsList,
  getNextReadingTipById,
  getPreviousReadingTipById,
};