import Utils from '../../utils/utils'
import SysData from '../../utils/sysData'

const User = {
  login (data) {
    Utils.storage.setItem(SysData.storage.user, data)
  },
  logout () {
    Utils.storage.setItem(SysData.storage.user, null)
  },
  isLogin () {
    return !!Utils.storage.getItem(SysData.storage.user)
  },
  getToken () {
    return Utils.storage.getItem(SysData.storage.token)
  },
  getInfo () {
    return Utils.storage.getItem(SysData.storage.user)
  },
  clearInfo () {
    Utils.storage.setItem(SysData.storage.user, null)
  }
}

export default User
