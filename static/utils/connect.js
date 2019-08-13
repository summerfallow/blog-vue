import { api } from './config'
import request from './request'

const Connect = async (id, params, callback) => {
  const result = await request(api[id], params)
  if (callback) callback(result)
}

export default Connect
