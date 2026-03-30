export type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
};
