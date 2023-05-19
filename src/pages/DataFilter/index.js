import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography, Table } from 'antd'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons'
import { Input } from 'antd'
const { Search } = Input
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
)
const onSearch = (value) => console.log(value)

function DataFilter () {
  return <div
    style={{
      padding: 24,
      minHeight: 800,
      marginLeft: 200,
      marginRight: 200,
      background: 'rgb(255, 255, 255)'
    }}>
    <Typography.Title
      level={2}
      style={{
        margin: 30,
        marginLeft: 220
      }}
    >
      <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />合同检索</Link>
    </Typography.Title>
    <Search placeholder="input search text" onSearch={onSearch} enterButton style={{
      margin: 30,
      marginLeft: 220,
      width: '70%'
    }} />
  </div>
}

export default DataFilter