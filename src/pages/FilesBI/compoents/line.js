// 封装线性表line组件
import * as echarts from 'echarts'
import { message } from 'antd'
import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { http } from '@/utils'

function LineFilter (lineProps) {
  const domRef = useRef()
  const chartInit = (option) => {
    echarts.dispose(domRef.current)
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption(option)
  }
  const bardim = lineProps.bardim
  const index_list = lineProps.index_v
  const table_name = lineProps.data_name
  const smoothstatus = lineProps.smoothstatus
  const gapstatus = lineProps.gapstatus
  const [bar, setBar] = useState([])
  useEffect(() => {
    const setLinedata = async () => {
      let series_data = []
      let bardim_li = []
      let option = {}
      try {
        const res = await http.post('/dataset/bar/', { bardim: bardim, index_list: index_list, table_name: table_name })
        setBar(res.data)
        bardim_li = res.data.bardim_list
        const bar_data = res.data.bar_data
        if (bar_data.length > 0) {
          for (let i = 0; i < bar_data.length; i++) {
            series_data.push(
              {
                name: bar_data[i].index_name,
                type: 'line',
                stack: 'Total',
                smooth: smoothstatus,
                data: bar_data[i].index_data
              }
            )
          }
        }
        else {
          series_data = []
        }
        option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show: lineProps.lengendstatus,
            data: index_list
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          toolbox: {
            show: lineProps.toolstatus,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: gapstatus,
            data: bardim_li
          },
          yAxis: {
            type: 'value'
          },
          series: series_data
        }
        chartInit(option)
        if (res.data.code === 400) {
          throw new Error
        }
      }
      catch (e) {
        message.error(bar.errmsg)
      }
    }
    setLinedata()
  }, [lineProps])


  return <div>
    {/* 准备一个挂载节点 */}
    <div ref={domRef} style={{ width: 1000, height: 650 }}></div>
  </div>
}

export default observer(LineFilter)