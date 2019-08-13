/* eslint-disable guard-for-in */
// import fetch from 'fetch'
import qs from 'qs'
import { Notification } from 'element-ui'

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.text()
  }
  const errortext = codeMessage[response.status] || response.statusText
  Notification.success({
    title: errortext,
    message: `请求错误 ${response.status}: ${response.url}`
  })
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(api, params) {
  let { url } = api;
  const newOptions = { method: api.type, body: params, credentials: 'include'}
  let data = {}
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    data = newOptions.body
    if (newOptions.headers) {
      newOptions.body = data
    } else {
      newOptions.body = qs.stringify(data)
    }
    newOptions.headers = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
  } else {
    delete newOptions.body;
    url = params ? `${url}?${qs.stringify(params)}` : url;
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      const json = eval(`(${response})`);
      // if (json.msg === '登陆超时，请重新登陆') {
      //   message.error('登录失效，正在跳转至登录页...')
      //   localStorage.removeItem('antd-pro-authority')
      //   localStorage.removeItem('userId')
      //   location.href = '/'
      // }
      return json
    })
}
