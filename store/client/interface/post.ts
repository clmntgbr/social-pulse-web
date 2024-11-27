export interface Post {
  postId: string;
  body: string;
  likeCount: number;
  commentsCount: number;
  repostsCount: number;
  images: Image[];
  article: Article;
  document: Document;
  url: string;
  postAt: string;
  uuid: string;
}

type Image = {
  url: string;
};

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
