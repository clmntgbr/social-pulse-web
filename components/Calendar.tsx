export const getStatusColorPublication = (str: string) => {
  switch (str) {
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-400 dark:text-white";
    case "programmed":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-400";
    case "posted":
      return "bg-green-100 text-green-800 dark:bg-green-400";
    default:
      return "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white";
  }
};
