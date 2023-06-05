import React, { useState, useEffect } from 'react'
import { Typography, Form, Table, Button, message, Col, Row, Card } from 'antd'
import { Outlet, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { http } from '@/utils'
import test from '@/assets/test.jpg'

const { Meta } = Card
function CPTN () {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const data_name = params.get('name')
  const [image1, setImage1] = useState()
  const [image2, setImage2] = useState()
  useEffect(() => {
    const getFiled = async () => {
      const res = await http.post('/contract/getfiled/', { name: data_name })
      setImage1(res.data.data1)
      setImage2(res.data.data2)

    }
    getFiled()
  }, [])
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
      <Link to={{ pathname: "/upload/files" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />文字检测</Link>
    </Typography.Title>
    <Row>
      <Col
        style={{
          padding: 24,
          marginLeft: 200,
        }}>
        <Card
          hoverable
          style={{
            width: 400,
            maxHeight: 700
          }}
          cover={<img alt="example" src={image2} />}
        >
          <Meta title="原图" description="合同原电子版文件" />
        </Card>
      </Col>
      <Col
        style={{
          padding: 24,
        }}>
        <Card
          hoverable
          style={{
            width: 400,
            maxHeight: 700
          }}
          cover={<img alt="example" src={image1} />}
        >
          <Meta title="文字检测结果图" description="合同文字提取结果" />
        </Card>
      </Col>
      <Col
        style={{
          marginRight: 40,
        }}>
        <Button type="primary" htmlType="submit" onClick={() => {
          console.log(233)
          navigate(`/bert?name=${data_name}`)
        }} style={{ marginLeft: 50, width: 100, marginTop: 260 }}>
          下一步
        </Button>
      </Col>
    </Row>
  </div>
}

export default CPTN