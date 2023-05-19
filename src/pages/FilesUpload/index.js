import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { Button, Space } from '@douyinfe/semi-ui'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography, Table } from 'antd'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const { Dragger } = Upload
const props = {
  name: 'file',
  multiple: true,
  accept: ".pdf, .docx",
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange (info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop (e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

function FilesUpload () {
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
      <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />新建合同</Link>
    </Typography.Title>
    <Typography.Title
      level={4}
      style={{
        margin: 30,
        marginLeft: 220
      }}
    >
      请上传合同文件
    </Typography.Title>
    <Dragger {...props}
      style={{
        margin: 30,
        marginLeft: 220,
        width: '60%'
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        目前仅支持docx和pdf格式文件
      </p>
    </Dragger>
  </div>
}

export default FilesUpload