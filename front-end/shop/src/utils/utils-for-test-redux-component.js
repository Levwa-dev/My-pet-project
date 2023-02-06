import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"
// As a basic setup, import your same slice reducers
import { commonProductsSlice } from "../store/common/common-reducers/products-reducer"
import { cartSlice } from "../store/common/common-reducers/cart-reducer";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { 
        commonProducts: commonProductsSlice.reducer,
        cart: cartSlice.reducer
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}