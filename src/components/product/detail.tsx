import { Product } from "../../types";

const ProductDetail = ({
  item: {
    description,
    category,
    title,
    image,
    price,
    rating: { rate },
  },
}: {
  item: Product;
}) => {
  return (
    <div className="product-detail">
      <p className="product-item__category">{category}</p>
      <p className="product-item__title">{title}</p>
      <img className="product-item__image" src={image} />
      <p className="product-item__description">{description}</p>
      <span className="product-item__price">${price}</span>
      <span className="product-item__rating">{rate}</span>
    </div>
  );
};
export default ProductDetail;
