export interface UrlResult {
  title: string;
  description: string;
  logo: string | null;
  image: string | null;
  url: string;
}

export type UrlDataEntry = { key: number | string } & UrlResult;