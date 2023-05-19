import React from "react"
import LoginStore from "./login.Store"
import UserStore from './user.Store'
import DatasetStore from "./dataset.Store"
import ColumnsStore from "./columns.Store"

class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.datasetStore = new DatasetStore()
    this.columnsStore = new ColumnsStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)