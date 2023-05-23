import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography, Table } from 'antd'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Select, Space, Button } from 'antd'
import { http } from '@/utils'
import Highlighter from 'react-highlight-words'

const scroll = {}
function DataFilter () {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
  const [columns, SetColumns] = useState([])
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })
  const [Selectedtable, SetSelectedtable] = useState()
  const [table_list, SetTableList] = useState([])
  useEffect(() => {
    const loadTableList = async () => {
      const res = await http.get('/contract/search/')
      SetTableList(res.data.table_list)
    }
    loadTableList()
  }, [])
  const [data, setData] = useState([])
  const onSearch = async (value) => {
    let series_data = []
    try {
      const res = await http.post('/contract/tabledata/', { table_name: value })
      console.log(res.data)
      setData(res.data.table_data)
      const table_columns = res.data.table_columns
      if (table_columns.length > 0) {
        for (let i = 0; i < table_columns.length; i++) {
          if (i === 0) {
            series_data.push(
              {
                title: table_columns[i],
                dataIndex: table_columns[i],
                key: table_columns[i],
                width: 150,
                fixed: 'left',
                ...getColumnSearchProps(table_columns[i]),

              }
            )
          } else {
            series_data.push(
              {
                title: table_columns[i],
                dataIndex: table_columns[i],
                key: table_columns[i],
                width: 150,
                ...getColumnSearchProps(table_columns[i]),

              }
            )
          }
        }
      }
      else {
        series_data = []
      }
      SetColumns(series_data)
    }
    catch (e) { }
  }
  if (columns.length > 4) {
    scroll.x = '100vw'
    scroll.y = 485
  } else {
    scroll.y = 485
  }
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
    <Select
      showSearch
      style={{
        margin: 30,
        marginLeft: 230,
        width: '70%'
      }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      value={Selectedtable}
      onChange={(value) => {
        onSearch(value)
      }}
      options={table_list}
    />
    <Table columns={columns}
      dataSource={data}
      bordered={true}
      scroll={scroll}
      style={{
        margin: 30,
        marginTop: 0,
        marginLeft: 230,
        width: '70%'
      }} />
  </div>
}

export default DataFilter