// login module
// 登录模块
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  getToken = async ({ username, password }) => {
    console.log(username, password)
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      username,
      password
    })
    this.token = res.data.token
    setToken(this.token)
  }
}
export default LoginStore