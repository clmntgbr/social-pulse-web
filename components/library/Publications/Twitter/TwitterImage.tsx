import Image from "next/image";

interface Props {
  pictures: string[];
}

export default function TwitterImage({ pictures }: Props) {
  if (!pictures || pictures.length === 0) {
    return null;
  }

  const getGridStyle = (imageCount: number) => {
    if (imageCount === 1) {
      return "grid-cols-1";
    }
    return "grid-cols-2";
  };

  const getpicturestyle = (index: number, total: number) => {
    if (total === 3 && index === 0) {
      return "h-full w-full row-span-2";
    }
    return "h-full w-full";
  };

  return (
    <div className={`grid overflow-hidden mt-3 gap-1 ${getGridStyle(pictures.length)}`} style={{ height: "250px" }}>
      {pictures.map((src, index) => (
        <div key={index} className={`relative overflow-hidden ${getpicturestyle(index, pictures.length)}`}>
          <Image src={src} alt="Picture" className="absolute inset-0 h-full w-full object-cover" width={500} height={500} />
        </div>
      ))}
    </div>
  );
}
