import { render, screen, waitFor } from "../../../test-ultilites/test-utils";
import EntryOrder from "../EntryOrder";
import { server } from "../../../mocks/server";
import { rest } from "msw";

// This test focus on testing what if the server error

test("testing error handle of toppings and toppings", async () => {
  // First step, over write the server so it give errors
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<EntryOrder />);
  // Because of the error come with the async so use Find By
  //   So the problem is that now we are waiting for 2 async function, and await only wait for one
  // To be able to wait for every component use use Waitfor (similar to waitToBeRemoved)
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: "An unexpected error!",
  //   });

  //   await findby only wait for the first element to success, not for all
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
  //   TODO: I haven't know why if I want to query the Alert is not working properly
});

// You can focus test you want with test.skip or test.only
