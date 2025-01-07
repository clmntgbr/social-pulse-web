import { Button } from "@/components/ui/button";
import { compressImage } from "@/composables/ConvertFileToBase64";
import usePublicationsContext from "@/contexts/publications/hooks";
import { SocialNetworkTypeEnum } from "@/enums/SocialNetworkType";
import { CreatePublication, initializeCreatePublication, initializePublication, Publication } from "@/store/client/interface/publication";
import { SocialNetwork } from "@/store/client/interface/social-network";
import { postPublications } from "@/store/publications/postPublications";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { EmojiPicker } from "../EmojiPicker";
import { ToastFail, ToastSuccess } from "../Toast";
import { DialogPublicationsHeader } from "./DialogPublicationsHeader";
import { DialogPublicationsImageGallery } from "./DialogPublicationsImageGallery";
import { DialogPublicationsImageUploader } from "./DialogPublicationsImageUploader";
import { PublicationsButton } from "./PublicationsButton";
import { PublicationsPreview } from "./PublicationsPreview";

interface DialogPublicationsProps {
  onCancel: () => void;
}

export function DialogPublications({ onCancel }: DialogPublicationsProps) {
  const [publication, setCreatePublication] = useState<CreatePublication>(initializeCreatePublication);
  const { publicationsDispatch } = usePublicationsContext();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (files: FileList) => {
    const imagesCount = publication.selected.pictures.length + files.length;

    if (publication.selected.socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.TWITTER && imagesCount > 4) {
      ToastFail("Something went wrong.", "Please choose up to 4 photos, videos, or GIFs.");
      return;
    }

    if (publication.selected.socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.LINKEDIN && imagesCount > 20) {
      ToastFail("Something went wrong.", "Please choose up to 20 photos, videos, or GIFs.");
      return;
    }

    const encodedImages = await Promise.all(Array.from(files).map(compressImage));
    setCreatePublication({
      ...publication,
      selected: {
        ...publication.selected,
        pictures: [...(publication.selected.pictures || []), ...encodedImages],
      },
      publications: publication.publications.map((pub) =>
        pub.uuid === publication.selected.uuid ? { ...pub, pictures: [...(pub.pictures || []), ...encodedImages] } : pub
      ),
    });
  };

  const handleAddThread = () => {
    setCreatePublication({
      ...publication,
      publications: [
        ...publication.publications,
        {
          ...initializePublication(publication.publications.length + 1, "secondary"),
          socialNetwork: publication.socialNetwork,
          publicationType: publication.socialNetwork?.socialNetworkType.name || null,
        },
      ],
    });
  };

  const handleRemoveImage = (index: number) => {
    setCreatePublication({
      ...publication,
      selected: {
        ...publication.selected,
        pictures: publication.selected.pictures.filter((_, i) => i !== index),
      },
      publications: publication.publications.map((pub) =>
        pub.uuid === publication.selected.uuid
          ? {
              ...pub,
              pictures: pub.pictures.filter((_, i) => i !== index),
            }
          : pub
      ),
    });
  };

  const handlePublicationSelect = (selectedPublication: Publication) => {
    setCreatePublication({
      ...publication,
      selected: selectedPublication,
    });
  };

  const handleSocialNetworkSelect = (selectedSocialNetwork: SocialNetwork) => {
    setCreatePublication({
      ...publication,
      socialNetwork: selectedSocialNetwork,
      selected: {
        ...publication.selected,
        publicationType: selectedSocialNetwork.socialNetworkType.name,
        socialNetwork: selectedSocialNetwork,
      },
      publications: publication.publications.map((pub) => ({
        ...pub,
        socialNetwork: selectedSocialNetwork,
        publicationType: selectedSocialNetwork.socialNetworkType.name,
      })),
    });
  };

  const handleTextChange = (value: string) => {
    setCreatePublication({
      ...publication,
      selected: {
        ...publication.selected,
        content: value,
        characters: value.length,
      },
      publications: publication.publications.map((pub) =>
        pub.uuid === publication.selected.uuid ? { ...pub, content: value, characters: value.length } : pub
      ),
    });
  };

  const handleOnDelete = (publication: Publication) => {
    setCreatePublication((prev) => {
      const currentIndex = prev.publications.findIndex((pub) => pub.uuid === publication.uuid);
      const newPublications = prev.publications.filter((pub) => pub.uuid !== publication.uuid);

      let newSelected = prev.selected;
      if (prev.selected?.uuid === publication.uuid) {
        newSelected = newPublications[Math.max(0, currentIndex - 1)] || null;
      }

      return {
        ...prev,
        publications: newPublications,
        selected: newSelected,
      };
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    setCreatePublication({
      ...publication,
      selected: {
        ...publication.selected,
        content: publication.selected.content + emoji,
      },
      publications: publication.publications.map((pub) =>
        pub.uuid === publication.selected.uuid ? { ...pub, content: publication.selected.content + emoji } : pub
      ),
    });
  };

  const handleSelect = (value: string, scheduledDate: Date) => {
    setIsLoading(true);

    if (value === "now") {
      value = "scheduled";
    }

    const isoDate = scheduledDate.toISOString();

    const updatedPublications = publication.publications.map((pub) => {
      const updatedPub = {
        ...pub,
        publishedAt: isoDate,
        status: value,
      };
      return updatedPub;
    });

    postPublications(`${data?.accessToken}`, updatedPublications, publicationsDispatch)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          ToastSuccess();
          onCancel();
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
          ToastFail();
        }, 2000);
      });
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-white  dark:bg-background flex flex-col" style={{ height: "calc(100vh - 2.5rem)" }}>
      <DialogPublicationsHeader onSelectSocialNetwork={handleSocialNetworkSelect} />
      <div className="flex-1 px-0 pt-4 flex flex-col min-h-0">
        <div className="flex-1 flex gap-4 min-h-0">
          <div className="w-1/2 h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <div className="mb-4 absolute ml-2 mt-2 flex gap-2">
                    <DialogPublicationsImageUploader onImageUpload={handleImageUpload} isDisabled={!publication.socialNetwork} />
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} isDisabled={!publication.socialNetwork} />
                    <Button variant="secondary" className="hover:text-primary" onClick={handleAddThread} disabled={!publication.socialNetwork}>
                      Add a {publication.selected.socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.TWITTER ? "thread" : "post"}
                    </Button>
                    {publication.socialNetwork && (
                      <Button variant="secondary" className="hover:text-primary">
                        {publication.selected.characters} / {publication.selected.socialNetwork?.maxCharacter}
                      </Button>
                    )}
                  </div>
                  <textarea
                    className={`w-full h-full pt-14 p-4 border rounded-lg resize-none dark:bg-background  focus:outline-none focus:ring-0 ${
                      !publication.socialNetwork ? "cursor-not-allowed" : ""
                    }`}
                    value={publication.selected.content ?? ""}
                    disabled={!publication.socialNetwork}
                    placeholder={`${!publication.socialNetwork ? "You have to choose a social network first." : "Type here"}`}
                    onChange={(e) => handleTextChange(e.target.value)}
                  />
                </div>
                <div className="h-[200px] mt-4 overflow-y-auto custom-scrollbar">
                  <DialogPublicationsImageGallery images={publication.selected.pictures} onRemoveImage={handleRemoveImage} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 dark:bg-secondary rounded-lg p-4 border overflow-y-auto custom-scrollbar">
            <PublicationsPreview
              onDelete={handleOnDelete}
              selected={publication.selected}
              publications={publication.publications}
              socialNetwork={publication.socialNetwork}
              onSelect={handlePublicationSelect}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <Button variant="outline" disabled={isLoading} className="px-6 py-2 rounded-lg transition-colors" onClick={onCancel}>
            Cancel
          </Button>
          <PublicationsButton onSelect={handleSelect} isDisabled={!publication.socialNetwork || isLoading} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default DialogPublications;
