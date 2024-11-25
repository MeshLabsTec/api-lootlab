export interface Link {
  url: string;
}

interface IProjectFeatures {
  title: string;
  isFeature: boolean;
}

interface LaunchInfo {
  launchDate: string;
  marketCap: number;
  currentSupply: string;
  totalSupply: number;
  privateSale: number;
  privateSaleQty: number;
  publicSale: number;
  publicSaleQty: number;
}

interface IPartnership {
  name: string;
  type: string;
  link_url: string;
}

export interface ICreatePost {
  title: string;
  market_link: string;
  score: number;
  investment: string;
  token: string;
  network: string;
  comment_author: string;
  authorId: string;
  links: Link[];
  projectFeatures: IProjectFeatures[];
  launchInfo: LaunchInfo;
  partnership: IPartnership[];
}
