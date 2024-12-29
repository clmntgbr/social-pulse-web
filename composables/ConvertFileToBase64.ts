export function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export const compressImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result as string;
                const cleanBase64 = base64.split(",")[1];
                const dataUrl = `data:image/jpeg;base64,${cleanBase64}`;
                resolve(dataUrl);
              };
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(blob);
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = reject;
      img.src = typeof event.target?.result === "string" ? event.target.result : "";
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
