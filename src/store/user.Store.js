// 用户模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class UserStore {
  username = ''
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const res = await http.get('/user/info/')
    this.username = res.data.username
  }
}

export default UserStore