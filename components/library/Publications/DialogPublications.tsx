import { Button } from "@/components/ui/button";
import { initializePublication, Publication } from "@/store/client/interface/publication";
import { SocialNetwork } from "@/store/client/interface/social-network";
import { useState } from "react";
import { DialogPublicationsHeader } from "./DialogPublicationsHeader";
import { DialogPublicationsImageGallery } from "./DialogPublicationsImageGallery";
import { DialogPublicationsImageUploader } from "./DialogPublicationsImageUploader";
import { DialogPublicationsPreview } from "./DialogPublicationsPreview";

interface DialogPublicationsProps {
  onCancel: () => void;
}

export function DialogPublications({ onCancel }: DialogPublicationsProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [publication, setPublication] = useState<Publication>(initializePublication());

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSocialNetworkSelect = (selectedSocialNetwork: SocialNetwork) => {
    setPublication({
      ...publication,
      socialNetwork: selectedSocialNetwork,
    });
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-white flex flex-col" style={{ height: "calc(100vh - 2.5rem)" }}>
      <DialogPublicationsHeader onSelectSocialNetwork={handleSocialNetworkSelect} />
      <div className="flex-1 px-0 pt-4 flex flex-col min-h-0">
        <div className="flex-1 flex gap-4 min-h-0">
          <div className="w-1/2 h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <DialogPublicationsImageUploader onImageUpload={handleImageUpload} isDisabled={!publication.socialNetwork} />
                  <textarea
                    className={`w-full h-full pt-14 p-4 border rounded-lg resize-none focus:outline-none focus:ring-0 ${
                      !publication.socialNetwork ? "cursor-not-allowed" : ""
                    }`}
                    value={text}
                    disabled={!publication.socialNetwork}
                    placeholder="type here ..."
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div className="h-[200px] mt-4 overflow-y-auto custom-scrollbar">
                  <DialogPublicationsImageGallery images={images} onRemoveImage={handleRemoveImage} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 rounded-lg p-4 overflow-y-auto custom-scrollbar">
            <DialogPublicationsPreview content={text} />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <Button variant="outline" className="px-6 py-2 rounded-lg transition-colors" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className={`px-6 py-2 text-white rounded-lg transition-colors ${!publication.socialNetwork ? "cursor-not-allowed" : ""}`}
            disabled={!publication.socialNetwork}
          >
            Validate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DialogPublications;
