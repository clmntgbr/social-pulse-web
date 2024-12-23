import { Button } from "@/components/ui/button";
import { convertFileToBase64 } from "@/composables/ConvertFileToBase64";
import usePublicationsContext from "@/contexts/publications/hooks";
import { SocialNetworkTypeEnum } from "@/enums/SocialNetworkType";
import { CreatePublication, initializeCreatePublication, initializePublication, Publication } from "@/store/client/interface/publication";
import { SocialNetwork } from "@/store/client/interface/social-network";
import { postPublications } from "@/store/publications/postPublications";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { EmojiPicker } from "../EmojiPicker";
import { ToastFail, ToastSuccess } from "../Toast";
import { DialogPublicationsHeader } from "./DialogPublicationsHeader";
import { DialogPublicationsImageGallery } from "./DialogPublicationsImageGallery";
import { DialogPublicationsImageUploader } from "./DialogPublicationsImageUploader";
import { PublicationsPreview } from "./PublicationsPreview";

interface DialogPublicationsProps {
  onCancel: () => void;
}

export function DialogPublications({ onCancel }: DialogPublicationsProps) {
  const [createPublication, setCreatePublication] = useState<CreatePublication>(initializeCreatePublication);
  const { publicationsDispatch } = usePublicationsContext();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (files: FileList) => {
    const base64Images = await Promise.all(
      Array.from(files).map(async (file) => {
        const base64 = await convertFileToBase64(file);
        return base64 as string;
      })
    );

    setCreatePublication({
      ...createPublication,
      selected: {
        ...createPublication.selected,
        pictures: [...(createPublication.selected.pictures || []), ...base64Images],
      },
      publications: createPublication.publications.map((pub) =>
        pub.uuid === createPublication.selected.uuid ? { ...pub, pictures: [...(pub.pictures || []), ...base64Images] } : pub
      ),
    });
  };

  const handleAddThread = () => {
    setCreatePublication({
      ...createPublication,
      publications: [
        ...createPublication.publications,
        {
          ...initializePublication(createPublication.publications.length + 1, "secondary"),
          socialNetwork: createPublication.socialNetwork,
          publicationType: createPublication.socialNetwork?.socialNetworkType.name || null,
        },
      ],
    });
  };

  const handleRemoveImage = (index: number) => {
    setCreatePublication({
      ...createPublication,
      selected: {
        ...createPublication.selected,
        pictures: createPublication.selected.pictures.filter((_, i) => i !== index),
      },
      publications: createPublication.publications.map((pub) =>
        pub.uuid === createPublication.selected.uuid
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
      ...createPublication,
      selected: selectedPublication,
    });
  };

  const handleSocialNetworkSelect = (selectedSocialNetwork: SocialNetwork) => {
    setCreatePublication({
      ...createPublication,
      socialNetwork: selectedSocialNetwork,
      selected: {
        ...createPublication.selected,
        publicationType: selectedSocialNetwork.socialNetworkType.name,
        socialNetwork: selectedSocialNetwork,
      },
      publications: createPublication.publications.map((pub) => ({
        ...pub,
        socialNetwork: selectedSocialNetwork,
        publicationType: selectedSocialNetwork.socialNetworkType.name,
      })),
    });
  };

  const handleTextChange = (value: string) => {
    setCreatePublication({
      ...createPublication,
      selected: {
        ...createPublication.selected,
        content: value,
      },
      publications: createPublication.publications.map((pub) => (pub.uuid === createPublication.selected.uuid ? { ...pub, content: value } : pub)),
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
      ...createPublication,
      selected: {
        ...createPublication.selected,
        content: createPublication.selected.content + emoji,
      },
      publications: createPublication.publications.map((pub) =>
        pub.uuid === createPublication.selected.uuid ? { ...pub, content: createPublication.selected.content + emoji } : pub
      ),
    });
  };

  const handleValidate = async () => {
    const date = new Date().toISOString();

    setIsLoading(true);
    setCreatePublication({
      ...createPublication,
      selected: {
        ...createPublication.selected,
        publishedAt: new Date().toISOString(),
      },
      publications: createPublication.publications.map((pub) => ({
        ...pub,
        publishedAt: date,
      })),
    });

    postPublications(`${data?.accessToken}`, createPublication.publications, publicationsDispatch)
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
    <div className="h-screen max-h-screen overflow-hidden bg-white  dark:bg-black flex flex-col" style={{ height: "calc(100vh - 2.5rem)" }}>
      <DialogPublicationsHeader onSelectSocialNetwork={handleSocialNetworkSelect} />
      <div className="flex-1 px-0 pt-4 flex flex-col min-h-0">
        <div className="flex-1 flex gap-4 min-h-0">
          <div className="w-1/2 h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <div className="mb-4 absolute ml-2 mt-2 flex gap-2">
                    <DialogPublicationsImageUploader onImageUpload={handleImageUpload} isDisabled={!createPublication.socialNetwork} />
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} isDisabled={!createPublication.socialNetwork} />
                    <Button variant="secondary" className="hover:text-primary" onClick={handleAddThread} disabled={!createPublication.socialNetwork}>
                      Add a {createPublication.selected.socialNetwork?.socialNetworkType.name === SocialNetworkTypeEnum.TWITTER ? "thread" : "post"}
                    </Button>
                  </div>
                  <textarea
                    className={`w-full h-full pt-14 p-4 border rounded-lg resize-none dark:bg-black  focus:outline-none focus:ring-0 ${
                      !createPublication.socialNetwork ? "cursor-not-allowed" : ""
                    }`}
                    value={createPublication.selected.content ?? ""}
                    disabled={!createPublication.socialNetwork}
                    placeholder={`${!createPublication.socialNetwork ? "You have to choose a social network first." : "Type here"}`}
                    onChange={(e) => handleTextChange(e.target.value)}
                  />
                </div>
                <div className="h-[200px] mt-4 overflow-y-auto custom-scrollbar">
                  <DialogPublicationsImageGallery images={createPublication.selected.pictures} onRemoveImage={handleRemoveImage} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 dark:bg-secondary rounded-lg p-4 border overflow-y-auto custom-scrollbar">
            <PublicationsPreview
              onDelete={handleOnDelete}
              selected={createPublication.selected}
              publications={createPublication.publications}
              socialNetwork={createPublication.socialNetwork}
              onSelect={handlePublicationSelect}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <Button variant="outline" disabled={isLoading} className="px-6 py-2 rounded-lg transition-colors" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleValidate}
            className={`px-6 py-2 rounded-lg transition-colors ${!createPublication.socialNetwork ? "cursor-not-allowed" : ""}`}
            disabled={!createPublication.socialNetwork || isLoading}
          >
            Validate
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DialogPublications;
