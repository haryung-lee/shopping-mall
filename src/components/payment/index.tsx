import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { EXECUTE_PAY } from "../../graphql/payment";
import { graphqlFetcher } from "../../queryClient";
import { checkedCartState } from "../../recoils/cart";
import WillPay from "../willPay";
import PaymentModal from "./modal";

type PayInfo = {
  id: string;
  amount: number;
};

type PaymentInfos = PayInfo[];

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const { mutate: executePay } = useMutation((payInfo: PaymentInfos) =>
    graphqlFetcher(EXECUTE_PAY, payInfo)
  );
  const [modalShown, setModalShown] = useState(false);

  const showModal = () => {
    setModalShown(true);
  };

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id, amount }) => ({ id, amount }));
    executePay(payInfos);
    // 결제 진행
    setCheckedCartData([]);
    navigate("/products");
  };

  const cancel = () => {
    setModalShown(false);
  };

  return (
    <div>
      <WillPay handleSubmit={showModal} submitTitle="결제하기" />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
    </div>
  );
};

export default Payment;
