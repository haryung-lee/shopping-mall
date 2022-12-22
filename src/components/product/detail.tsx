import { Product } from "../../graphql/products";

const ProductDetail = ({
  item: { description, title, imageUrl, price },
}: {
  item: Product;
}) => {
  return (
    <div className="product-detail">
      <p className="product-item__title">{title}</p>
      <img className="product-item__image" src={imageUrl} />
      <p className="product-item__description">{description}</p>
      <span className="product-item__price">${price}</span>
    </div>
  );
};
export default ProductDetail;
