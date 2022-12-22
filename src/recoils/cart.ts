import { atom, selectorFamily, useRecoilValue } from "recoil";

const cartState = atom<Map<string, number>>({
  key: "cartState",
  default: new Map(),
});

export const useCartItemSelector = selectorFamily({
  key: "cartItem",
  get:
    (id: string) =>
    ({ get }) => {
      const cart = get(cartState);
      return cart.get(id) || 0;
    },
  set:
    (id: string) =>
    ({ get, set }, newValue) => {
      if (typeof newValue === "number") {
        console.log(newValue);
        const newCart = new Map([...get(cartState)]);
        newCart.set(id, newValue);
        set(cartState, newCart);
      }
    },
});
