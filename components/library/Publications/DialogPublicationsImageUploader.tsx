import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

interface DialogPublicationsImageUploaderProps {
  onImageUpload: (files: FileList) => void;
  isDisabled: boolean;
}

export function DialogPublicationsImageUploader({ onImageUpload, isDisabled }: DialogPublicationsImageUploaderProps) {
  return (
    <>
      <Button variant="secondary" disabled={isDisabled} className="cursor-pointer px-0 py-0 hover:text-primary">
        <label htmlFor="image-upload" className="cursor-pointer p-4">
          <ImagePlus size={20} />
        </label>
      </Button>
      <input
        disabled={isDisabled}
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onImageUpload(e.target.files)}
      />
    </>
  );
}
