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
export {
  createAccount,
  getAccount,
  loginAccount,
};