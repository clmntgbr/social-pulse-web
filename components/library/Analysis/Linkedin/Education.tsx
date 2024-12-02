import { SocialAccount } from "@/store/client/interface/social-account";
import Image from "next/image";

interface Props {
  socialAccount: SocialAccount;
}

export default function LinkedinEducation({ socialAccount }: Props) {
  const { educations } = socialAccount;

  return (
    <>
      {educations.map((education, index) => (
        <div className="flex items-center gap-3 group" key={index}>
          <Image
            src={"https://avatar.vercel.sh/acme-inc.png"}
            width={100}
            height={100}
            alt={socialAccount.username ?? ""}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{education?.schoolName}</p>
            <p className="text-sm text-gray-400">{education?.fieldOfStudy}</p>
            <p className="text-xs text-gray-300 font-extrabold">{education.start.year !== 0 && education.start.year}</p>
          </div>
        </div>
      ))}
    </>
  );
}
