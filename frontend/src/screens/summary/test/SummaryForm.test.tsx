import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Testing checkbox function", () => {
  test("Initial Condition", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
  test("Checkbox disable button on fireclick", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /corfirm Order/i });

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).not.toBeDisabled();
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

test("testing hover effect", async () => {
  render(<SummaryForm />);

  const conditionHover = screen.getByText(/Terms and Conditions/i);
  const hoverInitial = screen.queryByText(/It will do notthing/i);
  // First load the page
  expect(hoverInitial).not.toBeInTheDocument();

  userEvent.hover(conditionHover);
  const hoverAppear = screen.getByText(/It will do notthing/i);
  expect(hoverAppear).toBeInTheDocument();

  userEvent.unhover(conditionHover);
  // Because unhover make it async remove (not instant), so need to wrap it in await for the to wait for the event
  await waitForElementToBeRemoved(() => {
    return screen.queryByText(/It will do notthing/i);
  });
});
