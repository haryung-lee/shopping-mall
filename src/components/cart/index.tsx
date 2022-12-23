import { createRef, SyntheticEvent, useRef } from "react";
import { CartType } from "../../graphql/cart";
import CartItem from "./Item";

const CartList = ({ items }: { items: CartType[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRef = items.map(() => createRef<HTMLInputElement>());

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;

    if (targetInput.classList.contains("select-all")) {
      const allChecked = targetInput.checked;
      checkboxRef.forEach((inputElem) => {
        inputElem.current!.checked = allChecked;
      });
    } else {
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
        allChecked;
    }
  };
  return (
    <form ref={formRef} onChange={handleCheckboxChanged}>
      <label>
        <input name="select-all" className="select-all" type="checkbox" />{" "}
        전체선택
      </label>
      <ul className="cart">
        {items.map((item, i) => (
          <CartItem {...item} key={item.id} ref={checkboxRef[i]} />
        ))}
      </ul>
    </form>
  );
};

export default CartList;
