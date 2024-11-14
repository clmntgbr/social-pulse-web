"use client";

type TwitterImageProps = {
  images: string[];
  className?: string;
};

export const TwitterImage = ({ images, className = "" }: TwitterImageProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  const getGridStyle = (imageCount: number) => {
    if (imageCount === 1) {
      return "grid-cols-1";
    }
    return "grid-cols-2";
  };

  const getImageStyle = (index: number, total: number) => {
    if (total === 3 && index === 0) {
      return "h-full w-full row-span-2";
    }
    return "h-full w-full";
  };

  return (
    <div className={`grid rounded-xl overflow-hidden mt-3 gap-1 ${getGridStyle(images.length)} ${className}`} style={{ height: "250px" }}>
      {images.map((src, index) => (
        <div key={index} className={`relative overflow-hidden ${getImageStyle(index, images.length)}`}>
          <img src={src} alt={`Image ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
};
