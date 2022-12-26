import { atom, selectorFamily, useRecoilValue } from "recoil";
import { CartType } from "../graphql/cart";

export const checkedCartState = atom<CartType[]>({
  key: "cartState",
  default: [],
});

// export const useCartItemSelector = selectorFamily({
//   key: "cartItem",
//   get:
//     (id: string) =>
//     ({ get }) => {
//       const cart = get(cartState);
//       return cart.get(id) || 0;
//     },
//   set:
//     (id: string) =>
//     ({ get, set }, newValue) => {
//       if (typeof newValue === "number") {
//         console.log(newValue);
//         const newCart = new Map([...get(cartState)]);
//         newCart.set(id, newValue);
//         set(cartState, newCart);
//       }
//     },
// });
