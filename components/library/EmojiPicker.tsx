import EmojiPickerReact from "emoji-picker-react";
import { SmileIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface EmojiPickerProps {
  isDisabled: boolean;
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect, isDisabled }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <Button variant="secondary" className="hover:text-primary" disabled={isDisabled} onClick={() => setShowPicker(!showPicker)}>
        <SmileIcon size={30} />
      </Button>
      {showPicker && (
        <>
          <div className="fixed inset-0" onClick={() => setShowPicker(false)} />
          <div className="absolute top-full mb-2">
            <EmojiPickerReact
              onEmojiClick={(emojiData) => {
                onEmojiSelect(emojiData.emoji);
                setShowPicker(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
