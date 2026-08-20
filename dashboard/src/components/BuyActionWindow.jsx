import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        {
          headers,
          withCredentials: true,
        }
      );

      if (generalContext && generalContext.closeBuyWindow) {
        generalContext.closeBuyWindow();
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(error.response?.data?.message || "Failed to place order. Please check authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (generalContext && generalContext.closeBuyWindow) {
      generalContext.closeBuyWindow();
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * (stockPrice || 140.65)).toFixed(2)}</span>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
            style={{ border: "none", cursor: "pointer" }}
          >
            {loading ? "Buying..." : "Buy"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            style={{ border: "none", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;