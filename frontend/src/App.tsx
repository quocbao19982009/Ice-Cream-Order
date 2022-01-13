import React, { useState } from "react";

import "./App.css";

import { Container } from "react-bootstrap";
import EntryOrder from "./screens/entry/EntryOrder";
import { OrderDetailsProvider } from "./context/orderDetailContext";
import OrderSummary from "./screens/summary/OrderSummary";
import OrderConfirmation from "./screens/confirmation/OrderConfirmation";
function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = EntryOrder;

  const setOrderPhaseHandler = (progress: string) => {
    setOrderPhase(progress);
  };

  switch (orderPhase) {
    case "inProgress":
      Component = EntryOrder;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <div className="main">
      <Container>
        <OrderDetailsProvider>
          <Component setOrderPhase={setOrderPhaseHandler} />
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;
