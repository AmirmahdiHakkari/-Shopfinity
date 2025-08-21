import type {  ProductCardProps } from "../../types";

const ProductsInCartItem = ({ product }: ProductCardProps) => {
  return (
    <div
      key={product.id}
      className="flex justify-between text-sm border-b pb-2"
    >
      <span>{product.title}</span>
      <span>
        {product.quantity} × ${product.price}
      </span>
    </div>
  );
};

export default ProductsInCartItem;
