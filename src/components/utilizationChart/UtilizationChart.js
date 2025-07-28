import  { useEffect, useState } from "react"; 
import axios from "axios";
import { io } from "socket.io-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";
import "./utilizationChart.css";

const socket = io( process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : `${process.env.REACT_APP_API_URL}`);

const UtilizationChart = () => {
  const [chartData, setChartData] = useState([]);
  const [week, setWeek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUtilization() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customer/latestUtilizationData`);
        const result = response.data;

        if (isMounted && Array.isArray(result)) {
          const formatted = result.map((item) => ({
            name: item.warehouse,
            utilization: Math.round(item.totalUtilization * 100), // assuming already in percent form like 87.5
          }));

          setWeek(result[0]?.week || null);
          setChartData(formatted);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching utilization data:", error);
          setLoading(false);
        }
      }
    }

    fetchUtilization(); 

    
    socket.on("excel-updated", () => {
      console.log("Socket event: excel-updated received, refetching utilization data...");
      fetchUtilization();
    });

    return () => {
      isMounted = false;          
      socket.off("excel-updated"); 
    };
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57'];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Weekly Utilization {week && `– Week ${week}`}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="utilization" barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default UtilizationChart;
