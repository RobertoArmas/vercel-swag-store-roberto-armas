import { getActivePromotion } from "@/lib/swag-store/promotions";
import { Promotion } from "@/types/store/promotions";

export default async function PromotionalBanner() {
  const isValid = (promotion: Promotion) => {
    return promotion.active;
    // Comented Date validation as API Response invalid dates
    // && new Date(promotion.validFrom) <= new Date() &&
    // new Date(promotion.validUntil) >= new Date()
  };

  const promotion = await getActivePromotion();
  if (!promotion || !isValid(promotion)) {
    return null;
  }

  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-center text-sm font-medium">
          {promotion.title} — {promotion.description} Code:{" "}
          <span className="font-bold">{promotion.code}</span>
        </p>
      </div>
    </div>
  );
}
