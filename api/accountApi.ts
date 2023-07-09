import { axiosInstance } from "./apiInstance"

function getAccount() {
  return axiosInstance.get('/accounts')
}

function createAccount(formBody: any) {
  return axiosInstance.post('/accounts/create', formBody)
}

function loginAccount(formBody: any) {
  return axiosInstance.post('/accounts/signin', formBody)
}

export {
  createAccount,
  getAccount,
  loginAccount,
};