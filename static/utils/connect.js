import qs from 'qs'

const Connect = function Connect () {
  let httpInterface = null
  let queryInterface = {}
  // let resourceInterface = null;
  let handleComplete = null

  // 初始化接口
  this.init = (options = {}) => {
    httpInterface = options.httpInterface
    // resourceInterface = options.resourceInterface;
    handleComplete = options.handleComplete
    console.log('Connect 初始化成功')
  }

  // 设置额外的参数
  this.setQuery = (query = {}) => {
    queryInterface = Object.assign({}, queryInterface, query)
  }

  // 设置额外的参数
  this.clearQuery = (key) => {
    // 删除指定的key，没有的指定的key删除全部
    if (key) {
      delete queryInterface[key]
    } else {
      queryInterface = {}
    }
  }

  // 访问接口
  this.getApi = function getApi (id, query = {}, headers = {}, success, error, fail = 1) {
    if (!httpInterface) console.error('Connect 未初始化')

    const that = this
    const api = httpInterface[id]
    const startTime = new Date().getTime()

    if (!api) {
      console.error(`不存在接口id:${id}`)
      error && error()
      return
    }

    const defaultOptions = {
      credentials: 'include',
      method: api.type,
      headers
    }
    const newOptions = Object.assign({}, defaultOptions)
    if (api.type === 'POST') {
      const body = qs.stringify(Object.assign({}, query, queryInterface))
      newOptions.headers = Object.assign({}, {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }, newOptions.headers)
      newOptions.body = body
    }

    fetch(api.url, newOptions)
      .then((response) => response.json())
      .then((json) => {
        const endTime = new Date().getTime()
        console.log(`访问接口${id}${api.name}成功 响应时间${endTime - startTime}ms`, headers, json)
        if (json.success) {
          if (handleComplete.success) {
            handleComplete.success && handleComplete.success(api, json, success)
          } else {
            success && success(json)
          }
        } else {
          error && error(json)
        }
      })
      .catch((e) => {
        if (fail <= 3) {
          console.log(`访问接口${id}${api.name}失败: 尝试重新连接 第${fail}次`, e.status, e.responseJSON)
          that.getApi(id, query, headers, success, error, fail + 1)
        } else {
          const json = e.responseJSON || {}
          console.log('网络连接错误')

          if (!json.success) {
            if (handleComplete.sysUpdate) {
              handleComplete.sysUpdate && handleComplete.sysUpdate(api, json, error)
            } else {
              error && error(json)
            }
          } else if (handleComplete.noNetwork) {
            handleComplete.noNetwork && handleComplete.noNetwork(api, json, error)
          } else {
            error && error(json)
          }
        }
      })
  }
}

const connect = new Connect()
export default connect
