import * as echarts from 'echarts'
import { message } from 'antd'
import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { http } from '@/utils'




function PieFilter (pieProps) {
  const domRef = useRef()
  const chartInit = (option) => {
    echarts.dispose(domRef.current)
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption(option)
  }
  const bardim = pieProps.bardim
  const index_list = pieProps.index_v
  const table_name = pieProps.data_name
  const [pie, setPie] = useState([])
  useEffect(() => {
    const setPiedata = async () => {
      let option = {}
      try {
        const res = await http.post('/dataset/pie/', { bardim: bardim, index: index_list[0], table_name: table_name })
        setPie(res.data)
        console.log(res.data.pie_data)
        const pie_data = res.data.pie_data
        option = {
          toolbox: {
            show: pieProps.toolstatus,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: true },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            show: pieProps.lengendstatus,
            type: 'scroll',
            orient: 'vertical',
            left: 'right'
          },
          series: [
            {
              name: index_list[0],
              type: 'pie',
              radius: '50%',
              data: pie_data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        chartInit(option)
        if (res.data.code === 400) {
          throw new Error
        }
      }
      catch (e) {
        message.error(pie.errmsg)
      }
    }
    setPiedata()
  }, [pieProps])

  return <div>
    {/* 准备一个挂载节点 */}
    <div ref={domRef} style={{ width: 1000, height: 650 }}></div>
  </div>
}

export default PieFilter