import React from "react";
import { Col, Form, Row } from "react-bootstrap";
interface ScoopOptionType {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

const ScoopOption = ({ name, imagePath, updateItemCount }: ScoopOptionType) => {
  // const handleChange = (e: React.ChangeEventHandler<FormControlProps>) => {
  //   console.log(e.);
  //   // updateItemCount(name, e.currentTarget.value);
  // };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={(e) => updateItemCount(name, e.target.value)}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
