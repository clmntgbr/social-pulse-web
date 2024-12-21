import Image from "next/image";

interface Props {
  pictures: string[];
}

export default function LinkedinImage({ pictures }: Props) {
  if (!pictures || pictures.length === 0) {
    return <></>;
  }

  if (pictures.length === 1) {
    return (
      <div className="w-full">
        <Image src={pictures[0]} alt={pictures[0]} className="w-full object-cover" width={500} height={500} />
      </div>
    );
  }

  if (pictures.length >= 1) {
    return (
      <div className="w-full space-y-1">
        <Image src={pictures[0]} alt={pictures[0]} className="w-full h-96 object-cover" width={500} height={500} />
        <div className="grid grid-cols-3 gap-1">
          {pictures[1] && <Image src={pictures[1]} alt="Picture" className="w-full h-48 object-cover" width={500} height={500} />}
          {pictures[2] && <Image src={pictures[2]} alt="Picture" className="w-full h-48 object-cover" width={500} height={500} />}
          {pictures[3] && (
            <div className="relative">
              <Image src={pictures[3]} alt="Picture" className="w-full h-48 object-cover" width={500} height={500} />
              {pictures.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-3xl font-normal">+{pictures.length - 4}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
