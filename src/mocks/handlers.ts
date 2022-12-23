import { CartType, DELETE_CART, UPDATE_CART } from "./../graphql/cart";
import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import { ADD_CART, GET_CART } from "../graphql/cart";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";

const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1 + "",
  imageUrl: `https://picsum.photos/seed/${i + 1}/200/300`,
  price: 50000,
  title: `Product ${i + 1}`,
  description: `Product ${i + 1} description`,
  createdAt: new Date(1616456789013 + i * 1000 * 60 * 60 * 10).toString(),
}));

let cartData: { [key: string]: CartType } = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find((item) => item.id === req.variables?.id);
    if (found) return res(ctx.data(found));
    return res();
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const id = req.variables?.id;
    let newItem;
    const targetProduct = mockProducts.find(
      (item) => item.id === req.variables?.id
    );
    if (!targetProduct) throw new Error("상품이 없습니다.");
    newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };
    newCartData[id] = newItem;
    cartData = newCartData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) throw new Error("Product not found");
    const newItem = {
      ...newData[id],
      amount,
    };
    newData[id] = newItem;
    cartData = newData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),
];
