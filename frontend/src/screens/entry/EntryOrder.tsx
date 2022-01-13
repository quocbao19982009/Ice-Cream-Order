import React from "react";
import Option from "./Option";
import { useOrderDetails } from "../../context/orderDetailContext";
import { Button } from "react-bootstrap";
interface EntryOrderTypes {
  setOrderPhase?: (progress: string) => void;
}

const EntryOrder = ({ setOrderPhase }: EntryOrderTypes) => {
  const [orderDetails] = useOrderDetails();
  console.log(orderDetails);
  // This Component is only using for testing error case

  const orderDisabled = orderDetails.totals.scoops === "$0.00";
  return (
    <div style={{ paddingTop: "2rem" }}>
      <h1>Design Your Sundae!</h1>
      <Option optionType="scoops"></Option>
      <Option optionType="toppings"></Option>
      <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
      <Button
        disabled={orderDisabled}
        onClick={() => {
          setOrderPhase!("review");
        }}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default EntryOrder;
