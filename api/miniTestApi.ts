import { MiniTestTypes } from "../interfaces";
import { axiosInstance } from "./apiInstance"

function getMiniTestsList(option: MiniTestTypes) {
  return axiosInstance.get('/mini-tests', { params: { option } })
}

function getMiniTestById(id: string) {
  return axiosInstance.get('/mini-tests/' + id)
}

function getNextMiniTestIdById(id: string) {
  return axiosInstance.get('/mini-tests/next', { params: { id } })
}


export {
  getMiniTestById,
  getMiniTestsList,
  getNextMiniTestIdById,
};