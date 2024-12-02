import { Post } from "@/store/client/interface/post";

interface Props {
  post: Post;
}

export default function LinkedinDocument({ post }: Props) {
  const { document } = post;

  if (!document) {
    return <></>;
  }

  if (!document.title || !document.totalPageCount || !document.url) {
    return <></>;
  }

  return (
    <a href={document.url} className="w-full bg-violet-500 block p-3" target="_blank">
      <p className="font-semibold text-sm">{document.title}</p>
      <p className="font-medium text-sm">{document.totalPageCount} pages</p>
    </a>
  );
}
