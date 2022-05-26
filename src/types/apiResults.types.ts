export type Thumbnail = {
  source: string;
  width: number;
  height: number;
};

export type Page = {
  pageid: number;
  ns: number;
  title: string;
  index: number;
  thumbnail?: Thumbnail;
  pageimage?: string;
  extract: string;
};

export type Pages = Record<string, Page>;

export type SearchResults = { query?: { pages: Pages } };
