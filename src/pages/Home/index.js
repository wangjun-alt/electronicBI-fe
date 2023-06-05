import { Card, Space, Typography, Popconfirm, message, Form } from 'antd'
import React from 'react'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { FolderOpenFilled, DeleteFilled } from '@ant-design/icons'
import { Modal, Select } from '@douyinfe/semi-ui'

function Home () {
  const [visible, setVisible] = useState(false)
  const [tableinfolist, setTableinfoList] = useState([])
  const [selecteditem, setSelectedItem] = useState()
  const showDialog = async (value) => {
    setVisible(true)
    try {
      const res = await http.post('/dataset/table/info/', { dataset_id: value })
      const result = res.data
      setTableinfoList(result.table_name)
    }
    catch (e) { }

  }
  const navigate = useNavigate()
  const handleOk = () => {
    setVisible(false)
    if (selecteditem) {
      navigate(`/data/bi?name=${selecteditem}`)
    }
    else {
      message.error('请先选择需要分析的数据表')
    }
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const { Title } = Typography
  const [datasetList, setDatasetList] = useState([])
  useEffect(() => {
    const loadDatasetList = async () => {
      const res = await http.get('/dataset/info')
      setDatasetList(res.data.dataset)
    }
    loadDatasetList()
  }, [])

  const delDataset = async (dataset) => {
    try {
      const res = await http.post('/dataset/delete/', { id: dataset.id })
      message.success('删除成功')
      const filteredArray = datasetList.filter(item => item.id !== dataset.id)
      setDatasetList(filteredArray)
    }
    catch (e) { }
  }
  return <div
    style={{
      padding: 24,
      marginLeft: 20,
      marginRight: 20,
      minHeight: 850,
      background: 'rgb(255, 255, 255)'
    }}
  >
    <Title level={3} style={{ paddingLeft: 24 }}>全部数据集</Title>
    <Space direction="horizontal" size={16} style={{ paddingLeft: 24 }}>
      {datasetList.map(dataset =>
        <Card key={dataset.id} title={dataset.data_name}
          actions={[
            <FolderOpenFilled key="more" onClick={() => showDialog(dataset.id)} />,
            <Popconfirm title="提示" description="是否确认删除该数据集？" placement="bottom" okText="删除" cancelText="取消" onConfirm={() => delDataset(dataset)}>
              <DeleteFilled key="delete" />
            </Popconfirm>
          ]}
          hoverable={true} style={{ width: 300 }}>
          <p>描述：{dataset.data_descr}</p>
          <p>创建者：{dataset.create_user}</p>
          <p>创建时间：{dataset.create_date}</p>
          <Modal
            title={dataset.data_name}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            maskStyle={{ opacity: 0.3 }}
            closeOnEsc={true}
          >
            <Form.Item
              label="请选择数据表"
              rules={[
                {
                  required: true,
                  message: '请选择数据表！',
                },
              ]}
            />
            <Select style={{ width: 400 }} optionList={tableinfolist} value={selecteditem} onChange={(value) => {
              setSelectedItem(value)
            }} placeholder="选择需要分析的数据表"></Select>
          </Modal>
        </Card>
      )}
    </Space>
  </div >
}

export default Home