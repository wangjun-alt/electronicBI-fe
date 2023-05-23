import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class ColumnsStore {
  columns = ''
  table_data = ''
  constructor() {
    makeAutoObservable(this)
  }
  // 获取已选择的维度和指标的数据
  setColumns = async ({ header, table_name, avagelist, maxlist, minlist, sumlist }) => {
    const res = await http.post('/dataset/headers/', { header, table_name, avagelist, maxlist, minlist, sumlist })
    this.columns = res.data.columns
    this.table_data = res.data.table_data
  }
}
export default ColumnsStore