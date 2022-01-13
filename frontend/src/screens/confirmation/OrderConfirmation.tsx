import axios from "axios";

import React, { useEffect, useState } from "react";

import { useOrderDetails } from "../../context/orderDetailContext";
import AlertBanner from "../components/AlertBanner";

interface OrderConfirmationTypes {
  setOrderPhase?: (progress: string) => void;
}

const OrderConfirmation = ({ setOrderPhase }: OrderConfirmationTypes) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  function handleClick() {
    resetOrder();

    setOrderPhase!("inProgress");
  }

  if (!orderNumber && !error) {
    return <div>Loading</div>;
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>As you guess, notthing happen now</p>
        <button onClick={handleClick}>Create new Order</button>
      </div>
    );
  }
  return <div>Loading</div>;
};

export default OrderConfirmation;
