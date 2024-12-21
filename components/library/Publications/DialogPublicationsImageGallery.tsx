import { Button } from "@/components/ui/button";
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
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 relative">
                <div className="p-1">
                  <Image width={60} height={60} src={image} alt={`Uploaded ${index + 1}`} className="w-48 h-48 object-cover rounded-lg m-auto" />
                </div>
                <Button
                  onClick={() => onRemoveImage(index)}
                  variant="outline"
                  className="absolute top-0 right-4 rounded-full w-9 h-9"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X size={16} />
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
