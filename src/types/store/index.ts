export type StoreConfiguration = {
  currency: string;
  storeName: string;
  features: {
    wishlist: boolean;
    productComparision: boolean;
    reviews: boolean;
    liveChat: boolean;
    recentlyViewed: boolean;
  };
  seo: SEO;
  socialLinks: SocialLinks;
};

export type SEO = {
  defaultDescription: string;
  defaultTitle: string;
  titleTemplate: string;
};

export type SocialLinks = {
  discord: string;
  github: string;
  twitter: string;
};
