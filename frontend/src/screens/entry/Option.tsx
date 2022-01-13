import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Alert, Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../components/AlertBanner";
import { pricePerItem } from "../../constants/priceItem";
import { useOrderDetails } from "../../context/orderDetailContext";
import { formatCurrency } from "../../utilities/formatCurrency";
interface optionTypeMethod {
  optionType: string;
}

const Option = ({ optionType }: optionTypeMethod) => {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  //   TODO: replace'null; with topping option
  //   const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  let ItemComponent: React.FunctionComponent<{
    name: string;
    imagePath: string;
    updateItemCount: (itemName: string, newItemCount: string) => void;
  }>;

  if (optionType === "scoops") {
    ItemComponent = ScoopOption;
  }
  //   use else if incase of the first option is not correct
  else if (optionType === "toppings") {
    ItemComponent = ToppingOption;
  }

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName: string, newItemCount: string) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  if (error) {
    return <AlertBanner />;
  }

  return (
    <>
      <h2>{title}</h2>

      <p>
        {
          // @ts-ignore
          formatCurrency(pricePerItem[optionType])
        }{" "}
        each
      </p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Option;
