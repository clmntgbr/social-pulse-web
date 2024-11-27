import { Post } from "@/store/client/interface/post";

interface LinkedinImageProps {
  post: Post;
}

export default function LinkedinArticle({ post }: LinkedinImageProps) {
  const { article } = post;

  if (!article.link || !article.title || !article.subtitle) {
    return <></>;
  }

  return (
    <a href={article.link} className="w-full bg-gray-600 block p-3" target="_blank">
      <p className="font-semibold text-sm">{article.title}</p>
      <p className="font-medium text-sm text-gray-400">{article.subtitle}</p>
    </a>
  );
}
