// 封装图表bar组件
import * as echarts from 'echarts'
import { message } from 'antd'
import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { http } from '@/utils'
import React from 'react'


function BarFilter (barProps) {
  const domRef = useRef()
  const chartInit = (option) => {
    echarts.dispose(domRef.current)
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption(option)
  }
  const bardim = barProps.bardim
  const index_list = barProps.index_v
  const table_name = barProps.data_name
  const [bar, setBar] = useState([])
  useEffect(() => {
    console.log(barProps)
    let series_data = []
    let bardim_li = []
    let option = {}
    const setBardata = async () => {
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
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                  focus: 'series'
                },
                data: bar_data[i].index_data
              }
            )
          }
        }
        else {
          series_data = []
        }
        option = {
          toolbox: {
            show: barProps.toolstatus,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              magicType: { show: true, type: ['bar', 'stack'] },
              saveAsImage: { show: true }
            }
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: barProps.lengendstatus,
            data: index_list
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: bardim_li
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
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
    setBardata()
  }, [barProps])
  const labelOption = {
    show: barProps.barstatus,
    position: 'insideBottom',
    distance: 80,
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  }
  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={{ width: 1100, height: 650 }}></div>
    </div>
  )
}

export default React.memo(observer(BarFilter))