import { render, screen } from "@testing-library/react";
import Option from "../Option";
import { OrderDetailsProvider } from "../../../context/orderDetailContext";

test("display image for each scoop option from server", async () => {
  render(<Option optionType="scoops" />, { wrapper: OrderDetailsProvider });
  // When render Options with OptionType, it will still access the HTTP://localhost3030/scoops => But it will send it into the mock server and get a respone from it

  // Find images

  // Because this is Photo is updated by using Async Function => This need to be handle in Async Maner => use Await findBy
  const scoopImages = await screen.findAllByRole("img", { name: /scoop/i });
  // Expect to find with async => Apprently await and Findby means that after the page load, then contienue to Find, instead of get it isntanstly

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const allScoopsText = scoopImages.map((element) => {
    const imageElement = element as HTMLImageElement;
    return imageElement.alt;
  });
  // return an array of alt in the image
  expect(allScoopsText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display toppings for each option from server", async () => {
  render(<Option optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const allToppingsText = toppingImages.map((element) => {
    const toppingElement = element as HTMLImageElement;
    return toppingElement.alt;
  });

  expect(allToppingsText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
