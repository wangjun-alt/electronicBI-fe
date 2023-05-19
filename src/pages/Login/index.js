import { Card } from 'antd'
import { Button, Checkbox, Form, Input, message } from 'antd'
import logo from '@/assets/logo.png'
import { Typography } from '@douyinfe/semi-ui'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'


function Login () {
  const { Title } = Typography
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const onFinish = async values => {
    console.log('Success:', values)
    try {
      await loginStore.getToken({
        username: values.username,
        password: values.password
      })
      if (loginStore.data.code === 400) {
        throw new Error()
      }
      navigate('/', { replace: true })
      message.success('登录成功')
    } catch (e) {
      message.error(loginStore.data.errmsg)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <Title heading={2} style={{ textAlign: 'center', letterSpacing: 2 }}>电力合同数据平台</Title>
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
            offset: 4
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            name="username"
            rules={[
              {
                type: 'string',
                message: '请检查您的输入是否正确',
              },
              {
                required: true,
                message: '请输入用户名',
              }
            ]}
          >
            <Input size="large" placeholder="请输入用户名" min={1} max={10} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: '请输入密码',
              type: 'string'
            }]}
          >
            {/* <Input size="large" placeholder="请输入密码" /> */}
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}

export default Login