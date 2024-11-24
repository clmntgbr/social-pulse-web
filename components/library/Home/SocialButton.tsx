import Image from "next/image";

interface SocialButtonProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SocialButton = ({ icon, label, isSelected, onClick }: SocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2.5 rounded-md
        ${isSelected ? "bg-blue-600 text-white shadow-lg" : "hover:bg-accent"}
        group flex items-center gap-2
      `}
    >
      <Image src={icon} alt={label} width={4} height={4} className={`w-4 h-4 transition-all duration-200 brightness-0 dark:invert ${isSelected ? "invert" : "opacity-100 group-hover:opacity-100"}`} />
      <span className={`text-sm font-medium ${isSelected ? "" : "opacity-70 group-hover:opacity-100"}`}>{label}</span>
      {isSelected && <span className="absolute inset-0 rounded-lg bg-blue-600 opacity-10"></span>}
    </button>
  );
};

export default SocialButton;
