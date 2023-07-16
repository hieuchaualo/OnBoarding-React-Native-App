import { axiosInstance } from "./apiInstance"

function getReadingTests() {
  return axiosInstance.get('/reading-tests')
}

function getReadingTest(id: number) {
    return axiosInstance.get('/reading-tests/' + id)
  }


export {
  getReadingTest,
  getReadingTests,
};