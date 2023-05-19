import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Typography, Form, Button, Alert, Space, Table, message } from 'antd'
import React from 'react'
import { Transfer, Input } from '@douyinfe/semi-ui'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'

function DataAdd () {
  const [v, $v] = useState([''])
  const navigate = useNavigate()
  const { datasetStore } = useStore()
  const onFinish = async values => {
    console.log('Success:', values)
    console.log(v)
    try {
      await datasetStore.getDataset({
        dataset_name: values.Dataname,
        dataset_desc: values.Datadesc,
        table_selected: v
      })
      console.log(datasetStore)
      if (datasetStore.data.code === 400) {
        throw new Error()
      }
      navigate(`/`, { replace: true })
      message.success('创建成功')
    } catch (e) {
      message.error(datasetStore.data.errmsg)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const [tabledataList, setTabledataList] = useState([])
  const [selecteddata, setSelectedData] = useState([])
  useEffect(() => {
    const loadTabledataList = async () => {
      const res = await http.get('/dataset/table/info')
      setTabledataList(res.data.table_data)
      console.log(res.data)
    }
    loadTabledataList()
  }, [])

  const loadTableList = React.useCallback(async ({ value }) => {
    console.log({ value })
    try {
      const res = await http.post('/dataset/table/data/', { v: value })
      console.log(res.data)
      setSelectedData(res.data.table_data)
    }
    catch (e) { }
  }, [])

  return <div
    style={{
      padding: 24,
      marginLeft: 200,
      marginRight: 200,
      minHeight: 800,
      background: 'rgb(255, 255, 255)'
    }}>
    <Typography.Title
      level={2}
      style={{
        margin: 30,
        marginLeft: 220
      }}
    >
      <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />新建数据集</Link>
    </Typography.Title>
    <div
      style={{
        padding: 20,
        height: 700,
        overflowX: 'hidden',
        overflowY: 'auto'
      }}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        labelCol={{
          span: 8,
        }}
        // wrapperCol={{
        //   span: 16,
        // }}
        style={{
          width: '70%',
          margin: 30,
          marginLeft: 225
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Typography.Title
          level={4}
        >
          设置数据集名称和描述
        </Typography.Title>
        <Form.Item
          label="数据集名称"
          name="Dataname"
          rules={[
            {
              required: true,
              message: '请输入数据集名称!',
            },
          ]}
        >
          <Input placeholder='请输入数据集名称' />
        </Form.Item>

        <Form.Item
          label="数据集描述"
          name="Datadesc"
          rules={[
            {
              required: true,
              message: '请输入数据集描述!',
            },
          ]}
        >
          <Input placeholder='请输入数据集描述' />
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={4}
          >
            请选择数据表
          </Typography.Title>
          <Alert message="注意：最多选择五张数据表" type="info" showIcon closable />
          <br></br>
          <div style={{ width: "100%" }}>
            <Transfer dataSource={tabledataList} type="treeList" value={v} onChange={(value) => {
              $v(value)
              loadTableList({ value })
            }}></Transfer>
          </div>
        </Form.Item>
        <Typography.Title
          level={4}
        >
          已选择的数据表
        </Typography.Title>
        <Form.Item>
          {selecteddata?.map(tabledata =>
            <div>
              <Typography.Title
                level={5}
              >
                表名：{tabledata.table_name}
              </Typography.Title>
              <Table
                columns={tabledata.table_columns}
                dataSource={tabledata.table_value}
                pagination={{
                  pageSize: 50,
                }}
                scroll={{
                  x: '80vw',
                  y: 240,
                }}
              />
            </div>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default DataAdd
