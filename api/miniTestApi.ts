import { IMiniTestHistory, MiniTestTypes } from "../interfaces";
import { axiosInstance } from "./apiInstance"

function getMiniTestsList(option: MiniTestTypes, page?: number) {
  return axiosInstance.get('/mini-tests', { params: { option, page } })
}

function getMiniTestById(id: string) {
  return axiosInstance.get('/mini-tests/' + id)
}

function getNextMiniTestIdById(id: string) {
  return axiosInstance.get('/mini-tests/next', { params: { id } })
}


function updateMiniTestHistory(formBody: IMiniTestHistory) {
  return axiosInstance.patch('/mini-tests/history', formBody)
}

function getMiniTestHistory() {
  return axiosInstance.get('/mini-tests/history')
}



export {
  getMiniTestById,
  getMiniTestsList,
  getNextMiniTestIdById,
  updateMiniTestHistory,
  getMiniTestHistory,
};