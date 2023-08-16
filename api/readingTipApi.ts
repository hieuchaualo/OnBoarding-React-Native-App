import { axiosInstance } from "./apiInstance"

function getReadingTipsList(page?: number) {
  return axiosInstance.get('/reading-tips', { params: { page } })
}

function getReadingTipById(id: string) {
  return axiosInstance.get('/reading-tips/' + id)
}


export {
  getReadingTipById,
  getReadingTipsList,
};