import { createSlice, configureStore } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { showCart: false },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, totalAmount: 0 },
  reducers: {
    addItemtoCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
          name: newItem.title,
        });
        state.totalAmount += newItem.price * newItem.quantity;
        state.totalQuantity += newItem.quantity;
      } else {
        state.totalQuantity += newItem.quantity;
        state.totalAmount += newItem.price * newItem.quantity;

        existingItem.totalPrice += newItem.price;
        existingItem.quantity += newItem.quantity;
      }
    },
    removeItemfromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount = Math.abs(state.totalAmount - existingItem.price);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export const uiActions = uiSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
