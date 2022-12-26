import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import ItemData from "../cart/itemData";

const WillPay = ({
  handleSubmit,
  submitTitle,
}: {
  handleSubmit: (e: SyntheticEvent) => void;
  submitTitle: string;
}) => {
  const navigate = useNavigate();
  const checkedItem = useRecoilValue(checkedCartState);
  const totalPrice = checkedItem.reduce((res, { price, amount }) => {
    res += price * amount;
    return res;
  }, 0);

  return (
    <div className="cart-willpay">
      <ul>
        {checkedItem.map(({ id, imageUrl, price, title, amount }) => (
          <li key={id}>
            <ItemData imageUrl={imageUrl} price={price} title={title} />
            <p>수량 : {amount}</p>
            <p>금액: {price * amount}</p>
          </li>
        ))}
      </ul>
      <p>총 예상결재액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default WillPay;
