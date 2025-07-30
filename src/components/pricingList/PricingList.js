import  { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./pricingList.css";
const apiUrl= process.env.NODE_ENV === "development"?"http://localhost:5000":process.env.REACT_APP_API_URL ;
const socket = io(apiUrl);

const PricingList = () => {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPricingData() {
      try {
        const res = await axios.get(`${apiUrl}/api/customer/pricingList`);
        if (isMounted) {
          setPricingData(res.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch pricing list:", error);
          setLoading(false);
        }
      }
    }

    fetchPricingData(); 

    socket.on("excel-updated", () => {
      console.log("Socket event: excel-updated received, refetching pricing data...");
      fetchPricingData();
    });

    return () => {
      isMounted = false;
      socket.off("excel-updated");
    };
  }, []);

  if (loading) return <p>Loading pricing data...</p>;
  if (!pricingData.length) return <p>No pricing data available.</p>;

  return (
    <div className="pricing-table-container">
      <table className="pricing-table">
        <thead>
          <tr>
            <th>Warehouse</th>
            <th>Dry Storage Price</th>
            <th>Temp-Controlled Price</th>
          </tr>
        </thead>
        <tbody>
          {pricingData.map((item, index) => (
            <tr key={index}>
              <td>{item.warehouse}</td>
              <td>{item.dryStoragePrice}</td>
              <td>{item.tempControlledPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingList;
