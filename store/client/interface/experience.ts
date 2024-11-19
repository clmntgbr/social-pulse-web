export type Experience = {
  companyName: string | null;
  companyUsername: string | null;
  companyURL: string | null;
  companyLogo: string | null;
  companyIndustry: string | null;
  companyStaffCountRange: string | null;
  title: string | null;
  location: string | null;
  description: string | null;
  employmentType: string | null;
  start: {
    year: number;
    month: number;
    day: number;
  };
  end: {
    year: number;
    month: number;
    day: number;
  };
};
