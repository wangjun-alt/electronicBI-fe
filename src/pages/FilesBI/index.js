import { Col, Row } from 'antd'
import { IllustrationConstruction, IllustrationConstructionDark, IllustrationNoContent, IllustrationIdleDark, IllustrationIdle, IllustrationNoContentDark, IllustrationFailureDark, IllustrationFailure } from '@douyinfe/semi-illustrations'
import { Typography, Table, Select, Tag, Switch } from 'antd'
import { Outlet, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Input, Space, Form, Tabs, TabPane, RadioGroup, Radio, Empty } from '@douyinfe/semi-ui'
import { IconSearch, IconBarChartVStroked, IconPieChart2Stroked, IconTestScoreStroked, IconLineChartStroked } from '@douyinfe/semi-icons'
import { useState, useEffect, useCallback } from 'react'
import { http } from '@/utils'
import TableFilter from './compoents/table'
import BarFilter from './compoents/bar'
import LineFilter from './compoents/line'
import PieFilter from './compoents/pie'

const tagRender_ind = (props) => {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color='cyan'
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>

  )
}

const tagRender_dim = (props) => {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color='pink'
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  )
}


function FilesBI () {
  const { Text } = Typography
  const { Section } = Form
  const [dimensionList, setDimensionList] = useState([])
  const [indexList, setIndexList] = useState([])
  const [params] = useSearchParams()
  const [status, setStatus] = useState([])
  const data_name = params.get('name')
  const [showHeader, setShowHeader] = useState(true)
  const [bordered, setBordered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState('middle')
  const [dimension_v, setDimension_V] = useState([])
  const [index_v, setIndex_V] = useState([])
  const [cloumnlist, setCloumnlist] = useState()
  useEffect(() => {
    setStatus('0')
    const loadColumnList = async () => {
      const res = await http.post('/dataset/columns/', { name: data_name })
      setDimensionList(res.data.coordinate_data.dimension)
      setIndexList(res.data.coordinate_data.index)
    }
    loadColumnList()
  }, [])

  const handleBorderChange = (bordered) => {
    setBordered(bordered)
  }
  const handleHeaderChange = (showHeader) => {
    setShowHeader(showHeader)
  }
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }


  const [bardim, setBarDim] = useState()
  const [toolstatus, setToolStatus] = useState(false)
  const [barstatus, setBarStatus] = useState(true)
  const handleBarChange = (barstatus) => {
    setBarStatus(barstatus)
  }
  const handleToolChange = (toolstatus) => {
    setToolStatus(toolstatus)
  }
  const [lengendstatus, setLengendStatus] = useState(false)
  const handleLegendChange = (lengendstatus) => {
    setLengendStatus(lengendstatus)
  }


  const tableProps = {
    bordered,
    loading,
    size,
    showHeader,
    dimension_v,
    index_v,
    data_name
  }
  const barProps = {
    bardim,
    index_v,
    barstatus,
    toolstatus,
    data_name,
    dimension_v,
    lengendstatus
  }

  const [gapstatus, setGapstatus] = useState(false)
  const handleGapChange = (gapstatus) => {
    setGapstatus(gapstatus)
  }
  const [smoothstatus, setSmoothstatus] = useState(false)
  const handleSmoothChange = (smoothstatus) => {
    setSmoothstatus(smoothstatus)
  }
  const lineProps = {
    smoothstatus,
    gapstatus,
    toolstatus,
    bardim,
    index_v,
    data_name,
    dimension_v,
    lengendstatus
  }

  const pieProps = {
    toolstatus,
    bardim,
    index_v,
    data_name,
    dimension_v,
    lengendstatus
  }

  const dim_list = []
  for (let i = 0; i < dimension_v.length; i++) {
    dim_list.push(
      {
        value: dimension_v[i],
        label: dimension_v[i],
      }
    )
  }
  return <div>
    <Row>
      <Col>
        <Row>
          <div
            style={{
              padding: 24,
              minHeight: 170,
              marginLeft: 20,
              width: 240,
              background: 'rgb(255, 255, 255)'
            }}>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                marginBottom: 10
              }}
            >
              <Link to={{ pathname: "/" }} style={{ color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '18px', margin: 6, marginLeft: 0, color: 'black' }} />数据表</Link>
            </Typography.Title>
            <Text strong>{data_name}</Text>
            <Input prefix={<IconSearch />} showClear placeholder='输入关键词搜索' style={{ marginTop: 20, width: '100%' }} ></Input>
          </div>
        </Row>
        <br></br>
        <Row>
          <div
            style={{
              padding: 24,
              minHeight: 320,
              marginLeft: 20,
              width: 240,
              background: 'rgb(255, 255, 255)'
            }}>
            <Typography.Title
              level={5}
              style={{
                margin: 10
              }}
            >维度</Typography.Title>
            <div style={{
              padding: 10,
              height: 200,
              overflowX: 'hidden',
              overflowY: 'auto'
            }}>
              <Space vertical spacing={3} align='start'>
                {dimensionList.map(columns_dim =>
                  <Text>{columns_dim.value}</Text>
                )}
              </Space>
            </div>
          </div>
        </Row>
        <br></br>
        <Row>
          <div
            style={{
              padding: 24,
              minHeight: 320,
              marginLeft: 20,
              width: 240,
              background: 'rgb(255, 255, 255)'
            }}
          >
            <Typography.Title
              level={5}
              style={{
                margin: 10
              }}
            >指标</Typography.Title>
            <div style={{
              padding: 10,
              height: 200,
              overflowX: 'hidden',
              overflowY: 'auto'
            }}>
              <Space vertical spacing={3} align='start'>
                {indexList.map(columns_ind =>
                  <Text>{columns_ind.value}</Text>
                )}
              </Space>
            </div>

          </div>
        </Row>
      </Col>
      <Col>
        <div
          style={{
            padding: 24,
            minHeight: 850,
            marginLeft: 20,
            width: 350,
            background: 'rgb(255, 255, 255)'
          }}>
          <Section text={'图表'} style={{ textAlign: 'center' }}></Section>
          <Tabs defaultActiveKey='1' onChange={(activeKey) => { setStatus(activeKey) }}>
            <TabPane
              tab={
                <span>
                  <IconTestScoreStroked style={{ fontSize: '20px', marginLeft: 10 }} />
                </span>
              }
              itemKey="1"
            >
              <Typography.Title
                level={5}
                style={{
                  margin: 10
                }}
              >客制化表格
              </Typography.Title>
              <Space vertical spacing={3} align='start'>
                <Text style={{ margin: 10, marginBottom: 0 }}>是否展示外边框和表格边框</Text>
                <Switch checked={bordered} onChange={handleBorderChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否显示表头</Text>
                <Switch checked={showHeader} onChange={handleHeaderChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>表格尺寸</Text>
                <RadioGroup type='button' buttonSize='middle' value={size} onChange={handleSizeChange} style={{ margin: 10, marginTop: 0 }}>
                  <Radio value={'large'}>大</Radio>
                  <Radio value={'middle'}>默认</Radio>
                  <Radio value={'small'}>小</Radio>
                </RadioGroup>
              </Space>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconBarChartVStroked style={{ fontSize: '20px', marginLeft: 10 }} />
                </span>
              }
              itemKey="2"
            >
              <Typography.Title
                level={5}
                style={{
                  margin: 10
                }}
              >客制化柱状图
              </Typography.Title>
              <Space vertical spacing={3} align='start'>
                <Text style={{ margin: 10, marginBottom: 0 }}>横轴字段</Text>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  value={bardim}
                  onChange={(value) => {
                    console.log(value)
                    setBarDim(value)
                  }}
                  //defaultValue={dim_list[0]}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  style={{
                    margin: 10,
                    marginTop: 0,
                    width: 270
                  }}
                  options={dim_list}
                />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否开启工具栏 </Text>
                <Switch checked={toolstatus} onChange={handleToolChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否显示指标信息 </Text>
                <Switch checked={barstatus} onChange={handleBarChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否显示图例 </Text>
                <Switch checked={lengendstatus} onChange={handleLegendChange} style={{ margin: 10, marginTop: 0 }} />
              </Space>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconLineChartStroked style={{ fontSize: '20px', marginLeft: 10 }} />
                </span>
              }
              itemKey="3"
            >
              <Typography.Title
                level={5}
                style={{
                  margin: 10
                }}
              >客制化线性图
              </Typography.Title>
              <Space vertical spacing={3} align='start'>
                <Text style={{ margin: 10, marginBottom: 0 }}>横轴字段</Text>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  value={bardim}
                  onChange={(value) => { setBarDim(value) }}
                  defaultValue={dim_list[0]}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  style={{
                    margin: 10,
                    marginTop: 0,
                    width: 270
                  }}
                  options={dim_list}
                />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否开启工具栏 </Text>
                <Switch checked={toolstatus} onChange={handleToolChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否开启边界间隙 </Text>
                <Switch checked={gapstatus} onChange={handleGapChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否线性平滑 </Text>
                <Switch checked={smoothstatus} onChange={handleSmoothChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否显示图例 </Text>
                <Switch checked={lengendstatus} onChange={handleLegendChange} style={{ margin: 10, marginTop: 0 }} />
              </Space>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconPieChart2Stroked style={{ fontSize: '20px', marginLeft: 10 }} />
                </span>
              }
              itemKey="4"
            >
              <Typography.Title
                level={5}
                style={{
                  margin: 10
                }}
              >客制化饼图
              </Typography.Title>
              <Space vertical spacing={3} align='start'>
                <Text style={{ margin: 10, marginBottom: 0 }}>维度选择</Text>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  value={bardim}
                  onChange={(value) => { setBarDim(value) }}
                  defaultValue={dim_list[0]}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  style={{
                    margin: 10,
                    marginTop: 0,
                    width: 270
                  }}
                  options={dim_list}
                />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否开启工具栏 </Text>
                <Switch checked={toolstatus} onChange={handleToolChange} style={{ margin: 10, marginTop: 0 }} />
                <Text style={{ margin: 10, marginBottom: 0 }}>是否显示图例 </Text>
                <Switch checked={lengendstatus} onChange={handleLegendChange} style={{ margin: 10, marginTop: 0 }} />
              </Space>
            </TabPane>
          </Tabs>
        </div>
      </Col>
      <Col>
        <Space vertical spacing={3}>
          <Row>
            <div
              style={{
                padding: 24,
                minHeight: 30,
                marginLeft: 20,
                width: 1100,
                background: 'rgb(255, 255, 255)'
              }}>
              <Typography.Title
                level={5}
                style={{
                  margin: 0,
                }}
              >维度<Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender_dim}
                  bordered={false}
                  style={{
                    marginLeft: 10,
                    width: '90%',
                  }}
                  value={dimension_v}
                  onChange={(value) => {
                    setDimension_V(value)
                    if (value.length === 0) {
                      setBarDim()
                    }
                  }}
                  options={dimensionList}
                />
              </Typography.Title>
            </div>
          </Row>
          <Row>
            <div
              style={{
                padding: 24,
                minHeight: 30,
                marginLeft: 20,
                width: 1100,
                background: 'rgb(255, 255, 255)'
              }}>
              <Typography.Title
                level={5}
                style={{
                  margin: 0,
                }}
              >指标
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender_ind}
                  bordered={false}
                  style={{
                    marginLeft: 10,
                    width: '90%',
                  }}
                  value={index_v}
                  onChange={(value) => {
                    setIndex_V(value)
                  }}
                  options={indexList}
                /></Typography.Title>
            </div>
          </Row>
          <Row>
            <div
              style={{
                padding: 24,
                minHeight: 700,
                marginLeft: 20,
                width: 1100,
                background: 'rgb(255, 255, 255)'
              }}>
              {
                (() => {
                  if (status === '1' || status === '0') {
                    if (index_v.length > 0 || dimension_v.length > 0) {
                      return <TableFilter {...tableProps} />
                    } else {
                      return <div>
                        <Empty
                          image={<IllustrationNoContent style={{ width: 300, height: 400 }} />}
                          darkModeImage={<IllustrationNoContentDark style={{ width: 300, height: 400 }} />}
                          title="最少选择一个维度或者一个指标哦"
                        ></Empty>
                      </div>
                    }
                  } else if (status === '2') {
                    if (index_v.length > 0 && dimension_v.length > 0 && bardim) {
                      return <div>
                        <BarFilter {...barProps} />
                      </div>
                    } else {
                      return <div>
                        <Empty
                          image={<IllustrationFailure style={{ width: 300, height: 400 }} />}
                          darkModeImage={<IllustrationFailureDark style={{ width: 150, height: 150 }} />}
                          title="你必须选择至少一个指标和维度，同时指定横坐标"
                        />
                      </div>
                    }
                  } else if (status === '3') {
                    if (index_v.length > 0 && dimension_v.length > 0 && bardim) {
                      return <LineFilter {...lineProps} />
                    }
                    else {
                      return <div>
                        <Empty
                          image={<IllustrationIdle style={{ width: 300, height: 400 }} />}
                          darkModeImage={<IllustrationIdleDark style={{ width: 150, height: 150 }} />}
                          title="你必须选择至少一个指标和维度，同时指定横坐标"
                        />
                      </div>
                    }
                  } else if (status === '4') {
                    if (index_v.length === 1 && bardim !== undefined && bardim !== null) {
                      return <PieFilter {...pieProps} />
                    } else {
                      return <div>
                        <Empty
                          image={<IllustrationConstruction style={{ width: 300, height: 400 }} />}
                          darkModeImage={<IllustrationConstructionDark style={{ width: 300, height: 400 }} />}
                          title={'饼图仅支持多个维度和一个指标'}
                        />
                      </div>
                    }
                  }
                })()}
            </div>
          </Row>
        </Space>
      </Col>
    </Row>
  </div>
}

export default FilesBI