import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/orderDetailContext";

interface OrderSummaryTypes {
  setOrderPhase?: (progress: string) => void;
}

const OrderSummary = ({ setOrderPhase }: OrderSummaryTypes) => {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  // @ts-ignore
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingDisplay = null;

  if (hasToppings) {
    const toppingsArray = Array.from(orderDetails.toppings.keys());
    // @ts-ignore
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingDisplay = (
      <>
        <h2>Toppings : {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
