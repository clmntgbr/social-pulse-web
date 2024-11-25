import { Post } from "@/store/client/interface/post";

interface LinkedinImageProps {
  post: Post;
}

export default function LinkedinImage({ post }: LinkedinImageProps) {
  const { images } = post;

  if (!images || images.length === 0) {
    return <></>;
  }

  if (images.length === 1) {
    return (
      <div className="w-full">
        <img src={images[0].url} alt="Post content" className="w-full object-cover" />
      </div>
    );
  }

  return <>{JSON.stringify(images)}</>;
}
