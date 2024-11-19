export type Education = {
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
  fieldOfStudy: string | null;
  url: string | null;
  degree: string | null;
  schoolName: string | null;
  description: string | null;
};
