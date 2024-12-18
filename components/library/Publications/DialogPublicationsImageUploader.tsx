import { ImagePlus } from "lucide-react";

interface DialogPublicationsImageUploaderProps {
  onImageUpload: (files: FileList) => void;
  isDisabled: boolean;
}

export function DialogPublicationsImageUploader({ onImageUpload, isDisabled }: DialogPublicationsImageUploaderProps) {
  return (
    <div className="mb-4 absolute ml-2 mt-2 flex gap-2">
      <>
        <label
          htmlFor="image-upload"
          className={`${
            isDisabled ? "cursor-not-allowed " : ""
          }flex items-center gap-2 px-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer w-fit transition-colors`}
        >
          <ImagePlus size={20} />
        </label>
        <input
          disabled={isDisabled}
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className={`hidden`}
          onChange={(e) => e.target.files && onImageUpload(e.target.files)}
        />
      </>
    </div>
  );
}
