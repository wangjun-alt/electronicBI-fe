// login module
// 登录模块
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, clearToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  getToken = async ({ username, password }) => {
    const res = await http.post('/user/login/', {
      username,
      password
    })
    this.data = res.data
    this.token = res.data.token
    setToken(this.token)
  }

  // 退出登录
  loginOut = () => {
    this.token = ''
    clearToken()
  }

}
export default LoginStore