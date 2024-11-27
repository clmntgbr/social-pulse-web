export interface LinkedinPost {
  article: Article;
  document: Document;
}

type Article = {
  link: string;
  subtitle: string;
  title: string;
};

type Document = {
  title: string;
  totalPageCount: number;
  url: string;
};
