export function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
