import React, { useState, useEffect } from 'react'
import { Chart } from '@antv/g2';
import http from '../../../api/request';
const WangqianChart = () => {
  const [wangqianData, setWangqianData] = useState([]);

  useEffect(() => {
    const getWangqianData = async () => {
      const data = await http(
        'GET',
        '/api/volume/latest',
        { city: 'bj' },
      )
      setWangqianData(data);
    }
    getWangqianData();
    return () => { };
  }, []);

  return (
    <div id="wangqian-chart">
    </div>
  )
}
export default WangqianChart