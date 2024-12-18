import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X } from "lucide-react";
import Image from "next/image";

interface DialogPublicationsImageGalleryProps {
  images: string[];
  onRemoveImage: (index: number) => void;
}

export function DialogPublicationsImageGallery({ images, onRemoveImage }: DialogPublicationsImageGalleryProps) {
  if (images.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-400"></div>;
  }

  return (
    <>
      <div className="px-14 h-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full h-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Image width={60} height={60} src={image} alt={`Uploaded ${index + 1}`} className="w-48 h-48 object-cover rounded-lg m-auto" />
                </div>
                <button
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover/image:opacity-100 transition-all duration-200 transform hover:scale-110"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X size={16} />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* <div className="grid grid-cols-3 gap-4 p-2">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
            <button
              onClick={() => onRemoveImage(index)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div> */}
    </>
  );
}
