import { useEffect } from 'react'
import { Chart } from '@antv/g2';
import http from '../../../api/request';
import styles from './index.module.scss';
import DataSet from '@antv/data-set';
const HuanbiChart = () => {

  // 获取网签近一年每月数据
  const getHuanbiData = async () => {
    let data = await http(
      'GET',
      '/api/volume/tongjiju',
      { city: 'bj' },
    )
    return data.data;
  }
  useEffect(() => {
    const renderHuanbiData = async () => {
      const data = await getHuanbiData();
      const wangqianLatestData = data.map((item: { Time: any; Xhuanbi: any; Ehuanbi: any }) => {
        return {
          date: item.Time,
          新建商品住宅: item.Ehuanbi,
          二手住宅: item.Xhuanbi
        }
      })
      const dv = new DataSet.DataView().source(wangqianLatestData);
      dv.transform({
        type: 'fold',
        fields: ['新建商品住宅', '二手住宅'], // 展开字段集
        key: 'type', // key字段
        value: 'value', // value字段
      });
      const chart = new Chart({
        container: 'huanbi-chart', // 指定图表容器 ID
        autoFit: true
      });

      chart.data(dv.rows);
      chart.scale('date', {
        range: [0, 1],
      });
      chart.scale('value', {
        nice: true,

      });
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
      });

      chart
        .area()
        .position('date*value')
        .color('type')
      chart
        .line()
        .position('date*value')
        .color('type');
      chart.render();
    }
    renderHuanbiData();
    return () => { };
  });

  return (
    <div id="huanbi-chart" className={styles.container}>
    </div>
  )
}
export default HuanbiChart