import { getProductStock } from "@/lib/swag-store/product";
import { FeaturedProduct } from "@/types/products/featured-product";
import AddToCartButtonClient from "./AddToCartButton.client";
export default async function AddToCartButton({
  product,
}: {
  product: FeaturedProduct;
}) {
  const stock = await getProductStock(product.slug);
  if (!stock.inStock)
    return <span className="text-gray-500">Out of Stock</span>;

  return <AddToCartButtonClient product={product} stock={stock.stock} />;
}
