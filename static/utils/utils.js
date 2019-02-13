import Cookies from 'js-cookie';

const Utils = {
  /**
   * @description 写入cookie
   **/
  setCookie(name, value, path = '/', time = 7){
    var expires = new Date();
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * time);
    Cookies.set(name, value, {expires, path});
  },
  /**
   * @description 获取cookie
   **/
  getCookie(name){
    var value = Cookies.getJSON(name);
    if (value) {
      return value;
    } else {
      return false;
    }
  },
  /**
   * @description 删除cookie
   **/
  removeCookie(name, path = '/'){
    Cookies.remove(name, { path })
  },
  /**
   * @description 存储到本地storage
   **/
  storage: {
    getItem: (name) => {
      const value = window.localStorage.getItem(name);
      return JSON.parse(value);
    },
    setItem: (name, value) => {
      window.localStorage.setItem(name, JSON.stringify(value));
    },
    setSion: (name, value) => {
      window.sessionStorage.setItem(name, JSON.stringify(value));
    },
    getSion: (name) => {
      const value = window.sessionStorage.getItem(name);
      return JSON.parse(value);
    }
  },
}

export default Utils
