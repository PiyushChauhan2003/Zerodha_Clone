import React, { useState, useEffect } from "react";
import axios from "axios";
import { positions as defaultPositions } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState(defaultPositions);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get("https://zerodha-clone-p79o.onrender.com/allPositions", {
        headers,
        withCredentials: true,
      })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAllPositions(res.data);
        }
      })
      .catch((err) => {
        console.warn("Using default positions data:", err.message);
      });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = (stock.price || 0) * (stock.qty || 0);
              const isProfit = curValue - (stock.avg || 0) * (stock.qty || 0) >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product || "CNC"}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg || 0).toFixed(2)}</td>
                  <td>{Number(stock.price || 0).toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - (stock.avg || 0) * (stock.qty || 0)).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day || "+0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;