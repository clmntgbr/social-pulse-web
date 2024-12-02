import { Post } from "@/store/client/interface/post";
import Image from "next/image";

interface Props {
  post: Post;
}

export default function LinkedinImage({ post }: Props) {
  const { images } = post;

  if (!images || images.length === 0) {
    return <></>;
  }

  if (images.length === 1) {
    return (
      <div className="w-full">
        <Image src={images[0].url} alt={images[0].url} className="w-full object-cover" width={500} height={500} />
      </div>
    );
  }

  if (images.length >= 1) {
    return (
      <div className="w-full space-y-2">
        <Image src={images[0].url} alt={images[0].url} className="w-full h-96 object-cover" width={500} height={500} />
        <div className="grid grid-cols-3 gap-2">
          {images[1] && <Image src={images[1].url} alt="Picture" className="w-full h-48 object-cover" width={500} height={500} />}
          {images[2] && <Image src={images[2].url} alt="Picture" className="w-full h-48 object-cover" width={500} height={500} />}
          {images[3] && <Image src={images[3].url} alt="Picture" className="w-full h-48 object-cover" width={500} height={500} />}
        </div>
      </div>
    );
  }

  return <>{JSON.stringify(images)}</>;
}
