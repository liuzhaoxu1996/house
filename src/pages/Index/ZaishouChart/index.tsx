import { useEffect } from 'react'
import { Chart } from '@antv/g2';
import http from '../../../api/request';
import styles from './index.module.scss';
const ZaishouChart = () => {

  // 获取网签近一年每月数据
  const getZaishouData = async () => {
    let data = await http(
      'GET',
      '/api/stat/guapan',
      { city: 'bj' },
    )
    return data.data;
  }

  useEffect(() => {
    const renderZaishouData = async () => {
      const data = await getZaishouData();
      const zaishouData = data.map((item: { Date: any; Lianjia: any }) => {
        return {
          date: item.Date,
          value: item.Lianjia,
        }
      })
      const chart = new Chart({
        container: 'zaishou-chart',
        autoFit: true,
        height: 500,
      });

      chart.data(zaishouData);
      chart.scale({
        value: {
          min: 10000,
          nice: true,
        },
        year: {
          range: [0, 1],
        },
      });
      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      chart.axis('value', {
        label: {
          formatter: (val) => {
            return (+val / 10000).toFixed(1) + 'k';
          },
        },
      });

      chart.area().position('date*value');
      chart.line().position('date*value');
      chart.render();
    }
    renderZaishouData();
    return () => { };
  });

  return (
    <div id="zaishou-chart" className={styles.container}>
    </div>
  )
}
export default ZaishouChart