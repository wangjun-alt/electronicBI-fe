import { Form, Radio, Space, Switch, Table } from 'antd'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { toJS } from "mobx"


const scroll = {}
function TableFilter (tableProps) {
  const columns_header = [...tableProps.dimension_v, ...tableProps.index_v]
  const table_name = tableProps.data_name
  const { columnsStore } = useStore()
  useEffect(() => {
    columnsStore.setColumns({ header: columns_header, table_name: table_name })
  }, [tableProps])
  const columns = toJS(columnsStore.columns) ?? []
  const data = toJS(columnsStore.table_data) ?? []
  if (columns.length > 4) {
    scroll.x = '100vw'
    scroll.y = 485
  } else {
    scroll.y = 485
  }
  return <div>
    <Table
      {...tableProps}
      columns={columns}
      dataSource={data}
      scroll={scroll}
    />
  </div>
}

export default observer(TableFilter)