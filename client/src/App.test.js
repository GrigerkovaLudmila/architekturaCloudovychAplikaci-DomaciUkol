import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dashboard route", async () => {
  global.fetch = jest.fn((path) => {
    if (path === "/category/list") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ itemList: [] }),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ itemList: [], categoryMap: {} }),
    });
  });

  render(<App />);

  expect(await screen.findByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
});
