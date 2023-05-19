import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { SignalFilled, HomeFilled, UserOutlined, PlusCircleFilled, FilterFilled, CloudFilled, LogoutOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Popconfirm, Avatar, message } from 'antd'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import './index.scss'
import { http } from '@/utils'
import { observer } from 'mobx-react-lite'

const { Header, Content, Footer, Sider } = Layout
function getItem (label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}
const items = [
  getItem('概览', '/', <HomeFilled />),
  getItem('数据分析', '/data/bi?name=contract_db', <SignalFilled />),
  getItem('合同上传', '/upload', <CloudFilled />, [
    getItem('文件上传', '/upload/files'),
    getItem('手动上传', '/upload/forms')
  ]),
  getItem('合同检索', '/data/filter', <FilterFilled />),
]
const Loyout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { userStore, loginStore } = useStore()
  const [datasetnum, setDataSetNum] = useState()
  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch { }
  }, [userStore])
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const onClick = (e) => {
    navigate(e.key, { replace: true })
  }
  // 退出登陆
  const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
  }

  const getDataSetNum = async () => {
    try {
      const res = await http.get('/dataset/getnum/')
      const nums = Number(res.data.dataset_num)
      if (nums < 5) {
        setDataSetNum("/data/add")
      } else {
        message.error('数据集仓库已满5个，请清理后再添加')
        setDataSetNum("/")
      }
    }
    catch (e) { }
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        trigger={null}
        collapsible collapsed={collapsed}
        //onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          fontWeight: 'bolder'
        }}>
        <div className="logo" />
        <div onClick={getDataSetNum} style={{ height: 40, borderRadius: 30, fontSize: 17, textAlign: 'center', lineHeight: 2.5, margin: 16, background: 'rgba(var(--semi-grey-2), 1)' }} >
          <Link to={{ pathname: datasetnum }} style={{ color: 'black' }}><PlusCircleFilled style={{ fontSize: '20px', margin: 2, color: '#555' }} />添加数据集</Link>
        </div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="user-info">
            <Avatar className='user-icon'
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
            <span className="user-name">{userStore.username}</span>
            <span className="user-logout">
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 50px 0 30px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '20px 0',
            }}
          >
          </Breadcrumb>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Electronic BI ©2023 Created by wupengfeng
        </Footer>
      </Layout>
    </Layout>
  )
}

export default observer(Loyout)