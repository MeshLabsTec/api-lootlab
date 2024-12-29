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
  publicSale: number;
}

interface IPartnership {
  type: string;
  link_url: string;
}

interface IGenre {
  id: string;
  name: string;
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
  partnerships: IPartnership[];
  genres: IGenre[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any;
}
