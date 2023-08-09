import { axiosInstance, axiosUploadFileInstance } from "./apiInstance"

function getAccount() {
  return axiosInstance.get('/accounts')
}

function createAccount(formBody: any) {
  return axiosInstance.post('/accounts/register', formBody)
}

function loginAccount(formBody: any) {
  return axiosInstance.post('/accounts/login', formBody)
}

function updateAccount(formBody: any) {
  return axiosInstance.patch('/accounts', formBody)
}

function updateAccountAvatar(formBody: any) {
  return axiosUploadFileInstance.patch('/accounts/avatar', formBody)
}

export {
  createAccount,
  getAccount,
  loginAccount,
  updateAccount,
  updateAccountAvatar,
};