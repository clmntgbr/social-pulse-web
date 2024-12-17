export const getStatusColorPublication = (str: string) => {
  switch (str) {
    case "failed":
      return "#FF0000";
    case "programmed":
      return "#FFFF00";
    case "posted":
      return "#00FF00";
    default:
      return "#C0C0C0";
  }
};
