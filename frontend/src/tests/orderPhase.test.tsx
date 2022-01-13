import { render, screen } from "../test-ultilites/test-utils";
import { findByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for success path", async () => {
  // Render App
  render(<App />);
  // Adding ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  const orderButton = screen.getByRole("button", { name: "Order Sundae" });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  userEvent.click(hotFudgeInput);
  userEvent.click(orderButton);

  const scoopsSummaryPrice = screen.getByRole("heading", {
    name: /Scoops: /i,
    exact: false,
  });
  const toppingsSummaryPrice = screen.getByRole("heading", {
    name: /Toppings :/i,
    exact: false,
  });
  const scoopsSummaryList = screen.getByText(/2 Vanilla/i);
  const toppingsSummaryList = screen.getByText(/Hot fudge/i);

  expect(scoopsSummaryPrice).toHaveTextContent("4.00");
  expect(toppingsSummaryPrice).toHaveTextContent("1.50");
  expect(scoopsSummaryList).toBeInTheDocument();
  expect(toppingsSummaryList).toBeInTheDocument();

  //   Find and lcick order button
  const termAndConditionCheckbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });

  userEvent.click(termAndConditionCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /Corfirm Order/i,
  });

  userEvent.click(confirmOrderButton);

  const orderNumber = await screen.findByText(
    /Your order number is 1234567890/i
  );

  expect(orderNumber).toBeInTheDocument();

  const creatNewOrderButton = screen.getByRole("button", {
    name: /Create new order/i,
  });

  userEvent.click(creatNewOrderButton);

  const scoopsSummaryPriceReset = screen.getByText(/Scoops total:/i);

  const toppingsSummaryPriceReset = screen.getByText(/Toppings total:/i);

  expect(scoopsSummaryPriceReset).toHaveTextContent("0.00");
  expect(toppingsSummaryPriceReset).toHaveTextContent("0.00");

  await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
});
