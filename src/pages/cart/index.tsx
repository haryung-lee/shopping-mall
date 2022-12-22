import { useQuery } from "react-query";
import CartList from "../../components/cart";
import { CartType, GET_CART } from "../../graphql/cart";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART));
  const cartItems = Object.values(data || {}) as CartType[];
  console.log("카트: ", cartItems);
  if (!cartItems.length) return "장바구니가 비어있어요!";
  return <CartList items={cartItems} />;
};

export default Cart;
