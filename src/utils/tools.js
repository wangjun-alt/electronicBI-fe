import React from 'react'
import { Form, Toast, Row, Col, TextArea, Typography } from '@douyinfe/semi-ui'

function Month_tool () {
  const { Text } = Typography
  return (
    <Form
      onSubmit={values => Toast.info({ content: JSON.stringify(values) })}
    >
      {
        ({ formState, values, formApi }) => (
          <Row>
            <Col span={12}>
              <Text>一月</Text>
              <Form.Input field='parents[0].name' placeholder='请尝试输入值' style={{ width: 200, required: true }} />
              <Form.Input field="parents[1]['name']" placeholder='请尝试输入值' />
            </Col>
            <Col span={10} offset={1} style={{ marginTop: 12 }}>
              <Form.Label text='FormState实时映射值：'></Form.Label>
              <TextArea value={JSON.stringify(formState.values)}></TextArea>
            </Col>
          </Row>
        )
      }
    </Form>
  )
}

export default Month_tool