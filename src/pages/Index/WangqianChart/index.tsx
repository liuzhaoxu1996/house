import { useEffect } from 'react'
import { Chart } from '@antv/g2';
import http from '../../../api/request';
import styles from './index.module.scss';
import moment from 'moment';
const WangqianChart = () => {

  const getWangqianMonthData = async () => {
    const stime = moment('2015-09-01').format("YYYY-MM-DD");
    const etime = moment().format("YYYY-MM-DD");
    let data = await http(
      'GET',
      '/api/volume/monthinfo',
      { stime, etime, city: 'bj' },
    )
    return data.data;
  }
  useEffect(() => {
    const renderWangqianLatestData = async () => {
      const data = await getWangqianMonthData();
      const wangqianData = data.map((item: { Time: any; Total: any }) => {
        return {
          date: item.Time,
          value: item.Total,
        }
      })
      const chart = new Chart({
        container: 'wangqian-chart',
        autoFit: true,
        height: 500,
      });

      chart.data(wangqianData);
      chart.scale({
        value: {
          min: 0,
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

      chart.area().position('date*value').shape('smooth');
      chart.line().position('date*value').shape('circle');
      chart.theme({ "styleSheet": { "brandColor": "#FF6B3B", "paletteQualitative10": ["#FF6B3B", "#626681", "#FFC100", "#9FB40F", "#76523B", "#DAD5B5", "#0E8E89", "#E19348", "#F383A2", "#247FEA"], "paletteQualitative20": ["#FF6B3B", "#626681", "#FFC100", "#9FB40F", "#76523B", "#DAD5B5", "#0E8E89", "#E19348", "#F383A2", "#247FEA", "#2BCB95", "#B1ABF4", "#1D42C2", "#1D9ED1", "#D64BC0", "#255634", "#8C8C47", "#8CDAE5", "#8E283B", "#791DC9"] } });
      chart.render();
    }
    renderWangqianLatestData();
    return () => {
    };
  }, []);

  return (
    <div id="wangqian-chart" className={styles.container}>
    </div>
  )
}
export default WangqianChart