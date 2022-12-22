import { gql } from "graphql-tag";

export type CartType = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  amount: number;
};

export const ADD_CART = gql`
  mutation ADD_CART($id: string) {
    id: string
    imageUrl: string
    price: number
    title: string
    amount: number
  }
`;

export const GET_CART = gql`
  query GET_CART {
    id: string
    imageUrl: string
    price: number
    title: string
    amount: number
  }
`;
