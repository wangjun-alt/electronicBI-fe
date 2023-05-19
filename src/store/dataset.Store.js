import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class DatasetStore {
  constructor() {
    makeAutoObservable(this)
  }
  // 获取已选择的维度和指标的数据
  getDataset = async ({ dataset_name, dataset_desc, table_selected }) => {
    const res = await http.post('/dataset/table/bi/', {
      dataset_name,
      dataset_desc,
      table_selected
    })
    this.data = res.data
  }


}
export default DatasetStore