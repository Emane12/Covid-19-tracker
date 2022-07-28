import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );
  
  

 const Line1 = (props) => {
  return (
    <div
    style={{
      width: '600px',
      height: '600px',
      margin: '50px auto'
    }}
    >
      <Line data={{
  labels: props.label.map(l => l.substr(0, 10)),
  datasets: [
    {
      label: 'reports',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'red',
      borderColor: 'red',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'red',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'red',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: props.yAxis
    }
  ]
}} />
    </div>
  )
}
export default Line1
