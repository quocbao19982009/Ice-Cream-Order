import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";

interface SummaryFormType {
  setOrderPhase?: (progress: string) => void;
}

const SummaryForm = ({ setOrderPhase }: SummaryFormType) => {
  const [checked, setChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>It will do notthing</Popover.Body>
    </Popover>
  );

  const sumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setOrderPhase!("completed");
  };

  const termCondition = (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="right"
      overlay={popover}
    >
      <span style={{ color: "blue" }}>Terms and Conditions</span>
    </OverlayTrigger>
  );

  const label = `I Agree to ${termCondition}`;

  return (
    <Form onSubmit={sumbitHandler}>
      <Form.Group>
        <Form.Check type="checkbox" id="checkbox">
          <Form.Check.Input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          ></Form.Check.Input>
          <Form.Check.Label>
            I agree to{" "}
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="right"
              overlay={popover}
            >
              <span style={{ color: "blue" }}>Terms and Conditions</span>
            </OverlayTrigger>
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>
        Corfirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
