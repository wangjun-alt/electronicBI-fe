import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography, Table } from 'antd'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { getToken } from '@/utils'

const { Dragger } = Upload

function FilesUpload () {
  const navigate = useNavigate()
  const props = {
    name: 'file',
    accept: ".png, .jpg",
    action: 'http://175.27.155.91:8000/contract/upload/',
    headers: {
      token: getToken()
    },
    onChange (info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        navigate(`/cptn?name=${info.file.name}`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop (e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
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
      <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />新建合同</Link>
    </Typography.Title>
    <Typography.Title
      level={4}
      style={{
        margin: 30,
        marginLeft: 420
      }}
    >
      请上传合同文件
    </Typography.Title>
    <div
      style={{
        marginLeft: 200,
        marginRight: 200,
        background: 'rgb(255, 255, 255)'
      }}>
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
          目前仅支持png和jpg格式文件
        </p>
      </Dragger>
    </div>
  </div>
}

export default FilesUpload