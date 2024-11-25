export interface Post {
  postId: string;
  body: string;
  likeCount: number;
  commentsCount: number;
  repostsCount: number;
  images: Image[];
  url: string;
  postAt: string;
  uuid: string;
}

type Image = {
  url: string;
};
