import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { FileOutlined, PieChartOutlined, UserOutlined, TeamOutlined, DesktopOutlined, LogoutOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Popconfirm, Avatar } from 'antd'
import { useState } from 'react'
import './index.scss'
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
  getItem('Option 1', '/', <PieChartOutlined />),
  getItem('Option 2', '/data', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
]
const Loyout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const onClick = (e) => {
    navigate(e.key, { replace: true })
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
        <div className="logo" />
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
            <span className="user-name">user.name</span>
            <span className="user-logout">
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 800,
              background: colorBgContainer,
            }}
          >
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

export default Loyout