import { IMiniTestHistory } from "../interfaces"
import { axiosInstance } from "./apiInstance"

function getAccount() {
  return axiosInstance.get('/accounts')
}

function createAccount(formBody: any) {
  return axiosInstance.post('/accounts/register', formBody)
}

function loginAccount(formBody: any) {
  return axiosInstance.post('/accounts/login', formBody)
}

function updateMiniTestHistory(formBody: IMiniTestHistory) {
  return axiosInstance.patch('/accounts/mini-test-history', formBody)
}

function getMiniTestHistory() {
  return axiosInstance.get('/accounts/mini-test-history')
}

export {
  createAccount,
  getAccount,
  loginAccount,
  updateMiniTestHistory,
  getMiniTestHistory,
};