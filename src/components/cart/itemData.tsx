import { CartType } from "../../graphql/cart";

const ItemData = ({
  imageUrl,
  title,
  price,
}: Pick<CartType, "imageUrl" | "price" | "title">) => {
  return (
    <>
      <img className="cart-item__image" src={imageUrl} />
      <p className="cart-item__title">{title}</p>
      <p className="cart-item__price">{price}</p>
    </>
  );
};

export default ItemData;
