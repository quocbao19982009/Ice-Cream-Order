import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderDetailsProvider } from "../context/orderDetailContext";

// Create a render method that always wrapped with Order COntext

const renderWithContext = (
  ui: ReactElement,
  option?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: OrderDetailsProvider, ...option });

// export everything again

export * from "@testing-library/react";
export { renderWithContext as render };
