import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
interface ToppingOptionType {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

const ToppingOption = ({
  name,
  imagePath,
  updateItemCount,
}: ToppingOptionType) => {
  const addToppingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked === true) {
      updateItemCount(name, "1");
    } else if (checked === false) {
      updateItemCount(name, "0");
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "55%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col
          xs="5"
          style={{ textAlign: "left", marginTop: "auto", marginBottom: "auto" }}
        >
          <Form.Check
            type="checkbox"
            onChange={(e) => addToppingHandler(e)}
          ></Form.Check>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
