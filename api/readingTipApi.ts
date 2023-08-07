import { axiosInstance } from "./apiInstance"

function getReadingTipsList() {
  return axiosInstance.get('/reading-tips')
}

function getReadingTipById(id: string) {
  return axiosInstance.get('/reading-tips/' + id)
}


export {
  getReadingTipById,
  getReadingTipsList,
};