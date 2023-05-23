import React, { useState } from 'react'
import { Typography, Form, Table, Button, message } from 'antd'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { DatePicker, Input, Space } from '@douyinfe/semi-ui'
import { Cascader, InputNumber, Toast, Row, Col, TextArea, Modal } from '@douyinfe/semi-ui'
import options from '@/utils/cities'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { http } from '@/utils'

function FormsUpload () {
  const navigate = useNavigate()
  const [formdata, setFormDate] = useState()
  const onFinish = (values) => {
    setFormDate(values)
    getContractNum(values)
  }
  const getContractNum = async (values) => {
    // try {
    console.log(formdata.contract_id)
    const res = await http.post('/contract/nums/', { contract_id: values.contract_id })
    console.log(res.data)
    if (res.data.code === 400) {
      message.error(res.data.errmsg)
    }
    if (res.data.code === 200) {
      showDialog()
    }
    //}
    // catch (e) {
    //   message.error('未知错误')
    // }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [visible, setVisible] = useState(false)
  const showDialog = () => {
    setVisible(true)
  }
  const [saleLoc, setSaleLoc] = useState()
  const [buyLoc, setBuyLoc] = useState()
  const [messagedata, setMessageData] = useState()
  const handleOk = () => {
    setVisible(false)
    const purchase_loc = formdata.buy_loc
    const purchasing_loaction = purchase_loc.join("/") + '/' + buyLoc
    const sale_loc = formdata.sale_loc
    const saleing_loaction = sale_loc.join("/") + '/' + saleLoc
    const setContractData = async () => {
      try {
        const res = await http.post('/contract/form-upload/', {
          contract_id: formdata.contract_id,
          contract_name: formdata.contract_name,
          part_a: formdata.part_a,
          part_b: formdata.part_b,
          part_c: formdata.part_c,
          contract_date: formdata.contract_date.toLocaleDateString(),
          effective_time: formdata.active_date[0].toLocaleDateString(),
          expiration_time: formdata.active_date[1].toLocaleDateString(),
          saleing_loaction: saleing_loaction,
          purchasing_loaction: purchasing_loaction,
          total_transaction_power: formdata.ele_total,
          sale_price: formdata.sale_price,
          delivery_year: formdata.year_ele,
          delivery_1_month: formdata.January,
          delivery_2_month: formdata.February,
          delivery_3_month: formdata.March,
          delivery_4_month: formdata.April,
          delivery_5_month: formdata.May,
          delivery_6_month: formdata.June,
          delivery_7_month: formdata.July,
          delivery_8_month: formdata.August,
          delivery_9_month: formdata.September,
          delivery_10_month: formdata.October,
          delivery_11_month: formdata.November,
          delivery_12_month: formdata.December
        })
        console.log(res.data)
        setMessageData(res.data)
        if (res.data.code === 400) {
          throw new Error()
        }
        navigate(`/`, { replace: true })
        message.success(res.data.errmsg)
      }
      catch (e) {
        message.error(messagedata.errmsg)
      }
    }
    setContractData()
  }
  const handleCancel = () => {
    setVisible(false)
    console.log('Cancel button clicked')
  }
  return <div
    style={{
      padding: 24,
      minHeight: 800,
      marginLeft: 200,
      marginRight: 200,
      background: 'rgb(255, 255, 255)'
    }}>
    <Modal
      title="提示"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      closeOnEsc={true}
      style={{ width: 400 }}
    >
      是否确定提交？
    </Modal>
    <Typography.Title
      level={2}
      style={{
        margin: 30,
        marginLeft: 220
      }}
    >
      <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '26px', margin: 4, color: 'black' }} />新建合同</Link>
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
          基础信息
        </Typography.Title>
        <Form.Item
          label="合同编号"
          name="contract_id"
          rules={[
            {
              required: true,
              message: '请输入合同编号！',
            },
          ]}
        >
          <Input placeholder='请输入合同编号' />
        </Form.Item>
        <Form.Item
          label="合同名称"
          name="contract_name"
          rules={[
            {
              required: true,
              message: '请输入合同名称！',
            },
          ]}
        >
          <Input placeholder='请输入合同名称' />
        </Form.Item>
        <Form.Item
          label="合同甲方"
          name="part_a"
          rules={[
            {
              required: true,
              message: '请输入甲方!',
            },
          ]}
        >
          <Input placeholder='请输入甲方' style={{ width: 300, }} />
        </Form.Item>
        <Form.Item
          label="合同乙方"
          name="part_b"
          rules={[
            {
              required: true,
              message: '请输入乙方!',
            },
          ]}
        >
          <Input placeholder='请输入乙方' style={{ width: 300, }} />
        </Form.Item>
        <Form.Item
          label="合同丙方"
          name="part_c"
          rules={[
            {
              required: true,
              message: '请输入丙方!',
            },
          ]}
        >
          <Input placeholder='请输入丙方' style={{ width: 300, }} />
        </Form.Item>
        <Form.Item
          label="合同签订日期"
          name="contract_date"
          rules={[
            {
              required: true,
              message: '请选择合同签订日期！',
            },
          ]}
        >
          <DatePicker field='date' type='date' initValue={new Date()} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item
          label="合同执行周期"
          name="active_date"
          rules={[
            {
              required: true,
              message: '请填写合同执行周期！',
            },
          ]}
        >
          <DatePicker type="dateRange" style={{ width: 600 }} />
        </Form.Item>
        <Form.Item
          label="售电方所在地"
          name="sale_loc"
          rules={[
            {
              required: true,
              message: '请填写售电方所在地！',
            },
          ]}
        >
          <Cascader
            style={{ width: 300 }}
            treeData={options}
            placeholder="请选择售电方所在地区"
          />
        </Form.Item>
        <TextArea maxCount={50} showClear style={{ marginBottom: 20 }} placeholder="请填写详细地址" value={saleLoc} onChange={(value) => {
          setSaleLoc(value)
        }} />
        <Form.Item
          label="购电方所在地"
          name="buy_loc"
          rules={[
            {
              required: true,
              message: '请填写购电方所在地！',
            },
          ]}
        >
          <Cascader
            style={{ width: 300 }}
            treeData={options}
            placeholder="请选择购电方所在地区"
          />
        </Form.Item>
        <TextArea maxCount={50} showClear placeholder="请填写详细地址" value={buyLoc} onChange={(value) => {
          setBuyLoc(value)
        }} />
        <Typography.Title
          level={4}
        >
          电力交易信息
        </Typography.Title>
        <Form.Item
          label="交易总电量"
          name="ele_total"
          rules={[
            {
              required: true,
              message: '请填写交易总电量！',
            },
          ]}
        >
          <InputNumber className='total-ele' innerButtons={true} suffix={'千瓦时'} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item
          label="售电价格"
          name="sale_price"
          rules={[
            {
              required: true,
              message: '请填写售电价格！',
            },
          ]}
        >
          <InputNumber className='sale-price' innerButtons={true} suffix={'元/每千瓦时'} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item
          label="按年交付电量"
          name="year_ele"
          rules={[
            {
              required: true,
              message: '请填写按年交付电量！',
            },
          ]}
        >
          <InputNumber className='year-ele' innerButtons={true} suffix={'千瓦时'} style={{ width: 300 }} />
        </Form.Item>
        <Typography.Title
          level={5}
        >
          按月交付电量
        </Typography.Title>
        <Row>
          <Col span={12}>
            <Form.Item
              label="一月"
              name="January"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="二月"
              name="February"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="三月"
              name="March"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="四月"
              name="April"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="五月"
              name="May"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="六月"
              name="June"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item
              label="七月"
              name="July"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="八月"
              name="August"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="九月"
              name="September"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="十月"
              name="October"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="十一月"
              name="November"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
            <Form.Item
              label="十二月"
              name="December"
              rules={[
                {
                  required: true,
                  message: '请输入交易电量!',
                },
              ]}
            >
              <InputNumber placeholder='请输入交易电量' innerButtons={true} suffix={'千瓦时'} style={{ width: 300, }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 350, marginTop: 20 }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default FormsUpload