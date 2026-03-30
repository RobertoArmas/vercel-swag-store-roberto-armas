import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/lib/swag-store/product";
export default async function DynamicFeaturedProducts({
  currency,
}: {
  currency: string;
}) {
  const products = await getFeaturedProducts();
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} currency={currency} />
      ))}
    </>
  );
}
