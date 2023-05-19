import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Typography, Form, Button, Alert, Space, Table } from 'antd'
import React, { useState } from 'react'
import { Transfer, Input } from '@douyinfe/semi-ui'
import { ArrowLeftOutlined } from '@ant-design/icons'

function DataEdit () {
  const [v, $v] = useState([''])
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
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
      <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />编辑数据集</Link>
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
              message: 'Please input your username!',
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
              message: 'Please input your password!',
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
            <Transfer dataSource={treeData} type="treeList" value={v} onChange={$v}></Transfer>
          </div>
        </Form.Item>
        <Form.Item>
          <Typography.Title
            level={4}
          >
            已选择的数据表
          </Typography.Title>
          <Typography.Title
            level={5}
          >
            表名：Beijing
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 50,
            }}
            scroll={{
              y: 240,
            }}
          />
        </Form.Item>
        <Form.Item
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default DataEdit

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    code_name: `Edward King ${i}`,
    code_type: 32,
    code_filter: `London, Park Lane no. ${i}`,
  })
}

const columns = [
  {
    title: '字段名称',
    dataIndex: 'code_name',
    key: 'code_name',
    width: 150,
  },
  {
    title: '字段类型',
    dataIndex: 'code_type',
    key: 'code_type',
    width: 150,
  },
  {
    title: '字段归类',
    dataIndex: 'code_filter',
    key: 'code_filter',
  },
]

const treeData = [
  {
    label: 'Asia',
    value: 'Asia',
    key: '0',
    children: [
      {
        label: 'China',
        value: 'China',
        key: '0-0',
        children: [
          {
            label: 'Beijing',
            value: 'Beijing',
            key: '0-0-0',
          },
          {
            label: 'Shanghai',
            value: 'Shanghai',
            key: '0-0-1',
          },
          {
            label: 'Chengdu',
            value: 'Chengdu',
            key: '0-0-2',
          },
        ],
      },
      {
        label: 'Japan',
        value: 'Japan',
        key: '0-1',
        children: [
          {
            label: 'Osaka',
            value: 'Osaka',
            key: '0-1-0',
          },
        ],
      },
    ],
  },
  {
    label: 'North America',
    value: 'North America',
    key: '1',
    children: [
      {
        label: 'United States',
        value: 'United States',
        key: '1-0',
      },
      {
        label: 'Canada',
        value: 'Canada',
        key: '1-1',
      },
      {
        label: 'Mexico',
        value: 'Mexico',
        disabled: true,
        key: '1-2',
      },
      {
        label: 'Cuba',
        value: 'Cuba',
        key: '1-3',
      },
    ],
  },
]