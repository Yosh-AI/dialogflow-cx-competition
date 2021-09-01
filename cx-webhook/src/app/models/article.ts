export interface Article {
  id: number | string | undefined;
  title: string;
  description: string;
  link: string;
  author: string;
  published: number;
  created: number;
  category: [];
  content: string;
  enclosures: [];
  content_encoded: "";
  media: {};
  image: string;
}
