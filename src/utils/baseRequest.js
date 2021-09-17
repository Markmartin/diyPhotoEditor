import axios from 'axios'
import Toast from 'muse-ui-toast'

const httpService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

const formatResponse = (status, data = {}, message = '', others = {}) => {
  return {
    status,
    data: data || {},
    message: message || '',
    others: others || {}
  }
}

const beforeSendRequest = (config) => {
  // config.headers = {
  //   ...config.headers,
  //   Authorization: getToken(),
  //   'content-Type': 'application/json'
  // }
  // config.responseType = 'json'
  return config
}

const sendRequestError = (error) => {
  return formatResponse(false, error, error.message)
}

const receiveResponseSuccess = (response) => {
  //http状态码
  const httpCodes = [200, 201]
  const codes = [200, 201]
  if (httpCodes.indexOf(response.status) !== -1) {
    //请求成功
    if (codes.indexOf(parseInt(response.data.code)) !== -1) {
      return formatResponse(true, response.data.data, '', { headers: response.headers, request: response.request })
    }
    return formatResponse(false, response, response.data.message || response.statusText)
  }
  return formatResponse(false, response, response.data.message || response.statusText)
}

const receiveResponseError = (error) => {
  const { response } = error
  return formatResponse(false, response, response.data.message || response.statusText || response.data.error)
}

httpService.interceptors.request.use(beforeSendRequest, sendRequestError)
httpService.interceptors.response.use(receiveResponseSuccess, receiveResponseError)

export const baseRequest = async (params) => {
  let response
  try {
    response = await httpService(params)
  } catch (error) {
    response = error
  }

  if (response.status === false) {
    Toast.error({ position: 'top', message: response.message || response.statusText })
    // Message({ type: 'error', center: true, message: response.message || response.statusText })
  }

  return {
    ...response,
    status: response ? response.status : false
  }
}
