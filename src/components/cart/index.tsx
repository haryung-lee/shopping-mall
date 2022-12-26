import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { CartType } from "../../graphql/cart";
import { checkedCartState } from "../../recoils/cart";
import CartItem from "./Item";
import WillPay from "./willPay";

const CartList = ({ items }: { items: CartType[] }) => {
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRef = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData | null>(null);

  const setAllCheckedFromItems = () => {
    // 개별 아이템 선택시
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;

    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
      allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    // select-all 선택시
    const allChecked = targetInput.checked;
    checkboxRef.forEach((inputElem) => {
      inputElem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e?.target as HTMLInputElement;
    if (targetInput.classList.contains("select-all")) {
      // select-all 선택시
      setItemsCheckedFromAll(targetInput);
    } else {
      // 개별아이템 선택시
      setAllCheckedFromItems();
    }
    const data = new FormData(formRef.current);
    setFormData(data);
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRef.find(
        (ref) => ref.current!.dataset.id === item.id
      );
      if (itemRef) itemRef.current!.checked = true;
    });
    setAllChecked();
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRef.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <div className="cart">
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input name="select-all" className="select-all" type="checkbox" />{" "}
          전체선택
        </label>
        <ul className="cart-items">
          {items.map((item, i) => (
            <CartItem {...item} key={item.id} ref={checkboxRef[i]} />
          ))}
        </ul>
      </form>
      <WillPay />
    </div>
  );
};

export default CartList;
