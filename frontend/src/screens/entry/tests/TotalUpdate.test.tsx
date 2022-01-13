import { render, screen } from "../../../test-ultilites/test-utils";
import userEvent from "@testing-library/user-event";
import Option from "../Option";

import EntryOrder from "../EntryOrder";
test("update scoop total when change", async () => {
  // If you want to test component that has a Global state provider, use Wrapper
  render(<Option optionType="scoops"></Option>);

  // Make sure start out at 0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  // By default, exact is true, but if you want to get an element that is dynamic, exact: false

  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // update vanilla scoop to 1 check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // Because Vanilla input come with async, loading from server so it need to be async, because we are finding only one so Await and Find is the Answer

  userEvent.clear(vanillaInput);
  // Before typing anything, best if we clear it first
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // update chocola and check subtotal

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  //   Why using spinbutton, and why a button has a name?
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping total when change", async () => {
  render(<Option optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  userEvent.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total start at $0.00", async () => {
    // Because after this test finish, the application still continue to get promise from Async so this why it give warning about wrap in act(...) or unmount component
    // To handle this? Not sure, but you can move the test into another wherre the async can happen

    render(<EntryOrder />);
    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates if scoop added first", async () => {
    render(<EntryOrder />);
    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    userEvent.type(vanillaInput, "1");
    userEvent.click(hotFudgeInput);
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates if topping added first", async () => {
    render(<EntryOrder />);
    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    userEvent.click(hotFudgeInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates if item remove", async () => {
    render(<EntryOrder />);
    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeInput);
    userEvent.type(vanillaInput, "2");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    userEvent.click(hotFudgeInput);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
