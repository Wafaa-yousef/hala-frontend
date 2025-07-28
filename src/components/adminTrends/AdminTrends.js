import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "./adminTrends.css"
const socket = io( process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : `${process.env.REACT_APP_API_URL}`);
export default function AdminTrends() {
  const [chartData, setChartData] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  

  
  useEffect(() => {
  let isMounted = true;

  const fetchTrends = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin/trends`)
      .then(res => {
        if (!isMounted) return;

        const raw = res.data;

        const weekSet = new Set();
        raw.forEach(w => w.trend.forEach(t => weekSet.add(t.week)));
        const weeks = Array.from(weekSet).sort();

        const formatted = weeks.map(week => ({ week }));

        raw.forEach(w => {
          const warehouseName = w.warehouse;

          w.trend.forEach(({ week, utilization }) => {
            const weekRow = formatted.find(f => f.week === week);
            if (weekRow) {
              weekRow[warehouseName] = Math.round(utilization * 10000) / 100;
            }
          });
        });

        setChartData(formatted);
        setWarehouses(raw.map(w => w.warehouse));
      })
      .catch(err => {
        if (isMounted) {
          console.error('Error fetching admin trends', err);
        }
      });
  };

  fetchTrends(); 

  
  socket.on('excel-updated', () => {
    console.log('Socket event: excel-updated received, refetching...');
    fetchTrends();
  });

  return () => {
    isMounted = false;
    socket.off('excel-updated');
  };
}, []);


  return (
    <div className='chartContainer' style={{color:"white"}}>
      <h2>📈 Admin Trends (Utilization % by Week)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" /> 
          <XAxis dataKey="week" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip formatter={(v) => `${v}%`} />
          <Legend />
          {warehouses.map((name, i) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={['#e20ed8ff', '#8b740bff', '#f57710ff', '#f71647ff', '#129b82ff','#33f84dff','#1386bbff'][i % 7]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
