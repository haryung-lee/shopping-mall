import { CartType } from "../../graphql/cart";
import CartItem from "./Item";

const CartList = ({ items }: { items: CartType[] }) => {
  return (
    <>
      <label>
        <input className="" type="checkbox" /> 전체선택
      </label>
      <ul className="cart">
        {items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default CartList;
